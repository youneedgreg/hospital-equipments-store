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

  const [
    { data: products, error: productsError },
    { data: orders, error: ordersError },
  ] = await Promise.all([
    supabase
      .from("products")
      .select("id")
      .eq("supplier_id", user.id),
    supabase
      .from("orders")
      .select("total_amount")
      .eq("supplier_id", user.id)
      .eq("status", "delivered"),
  ])

  if (productsError) {
    console.error("Error fetching products:", productsError)
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 })
  }

  if (ordersError) {
    console.error("Error fetching orders:", ordersError)
    return NextResponse.json({ error: "Error fetching orders" }, { status: 500 })
  }

  const totalSales = orders.reduce((acc, order) => acc + order.total_amount, 0)

  return NextResponse.json({
    activeProducts: products.length,
    totalSales,
  })
}
