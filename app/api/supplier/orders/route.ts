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

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select(
      `
      id,
      created_at,
      status,
      total_amount,
      order_items (
        quantity,
        products (
          name
        )
      ),
      profiles (
        full_name
      )
    `
    )
    .eq("supplier_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  if (ordersError) {
    console.error("Error fetching orders:", ordersError)
    return NextResponse.json({ error: "Error fetching orders" }, { status: 500 })
  }

  return NextResponse.json({ orders }, { status: 200 })
}
