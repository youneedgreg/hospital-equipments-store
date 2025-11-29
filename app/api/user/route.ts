import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // FIX: cookies() must be awaited
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map((cookie): {
            name: string
            value: string
            options: Record<string, any>
          } => ({
            name: cookie.name,
            value: cookie.value,
            options: {
              path: cookie.path || "/",
            },
          }))
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
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

  // Fetch user profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, phone")
    .eq("id", user.id)
    .single()

  if (profileError) {
    console.error("Error fetching profile:", profileError)
    return NextResponse.json({ error: "Error fetching profile" }, { status: 500 })
  }

  // Fetch orders
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select(`
      id,
      created_at,
      status,
      total_amount,
      order_items(
        id,
        quantity,
        products(
          id,
          name,
          price,
          image_url
        )
      )
    `)
    .eq("buyer_id", user.id)
    .order("created_at", { ascending: false })

  if (ordersError) {
    console.error("Error fetching orders:", ordersError)
    return NextResponse.json({ error: "Error fetching orders" }, { status: 500 })
  }

  return NextResponse.json({ user: { ...user, profile }, orders }, { status: 200 })
}
