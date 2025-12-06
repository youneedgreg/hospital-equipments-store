
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
    category_id,
    price,
    original_price,
    stock_count,
    image_url,
    dimensions,
    weight,
    material,
    warranty,
    features,
  } = await request.json()

  if (!name || !description || !category_id || !price || !stock_count) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        name,
        description,
        category_id: category_id,
        price,
        original_price: original_price,
        stock_count: stock_count,
        image_url: image_url,
        supplier_id: supplier.id,
        specifications: {
          dimensions,
          weight,
          material,
          warranty,
        },
        features: features,
      },
    ])
    .select()

  if (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
