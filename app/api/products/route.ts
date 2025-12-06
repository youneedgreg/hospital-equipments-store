
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: supplier, error: supplierError } = await supabase
    .from("suppliers")
    .select("id")
    .eq("profile_id", user.id)
    .single()

  if (supplierError || !supplier) {
    console.error("Error fetching supplier:", supplierError)
    return NextResponse.json({ error: "Failed to find supplier" }, { status: 500 })
  }

  const {
    name,
    description,
    category,
    sku,
    price,
    originalPrice,
    stock,
    images,
    dimensions,
    weight,
    material,
    warranty,
  } = await request.json()

  if (!name || !description || !category || !price || !stock) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        name,
        description,
        category_id: category,
        sku,
        price,
        original_price: originalPrice,
        stock_count: stock,
        image_url: images.length > 0 ? images[0] : null,
        supplier_id: supplier.id,
        specifications: {
          dimensions,
          weight,
          material,
          warranty,
        },
      },
    ])
    .select()

  if (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
