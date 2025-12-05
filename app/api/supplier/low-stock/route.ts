import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookies().getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookies().set(name, value, options))
        },
      },
    }
  )
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profileError || !profile || profile.role !== "supplier") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("name, stock_count, low_stock_threshold")
    .eq("supplier_id", user.id)
    .lt("stock_count", 5) // Assuming a low stock threshold of 5 for now
    .order("stock_count", { ascending: true })

  if (productsError) {
    console.error("Error fetching low stock products:", productsError)
    return NextResponse.json({ error: "Error fetching low stock products" }, { status: 500 })
  }

  return NextResponse.json({ products }, { status: 200 })
}
