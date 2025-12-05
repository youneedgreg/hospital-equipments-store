import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map((cookie) => ({
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
    error: userErr,
  } = await supabase.auth.getUser()

  if (userErr || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Fetch user profile (map DB fields)
  let { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, phone, organization_name, organization_type")
    .eq("id", user.id)
    .single()

  if (profileError) {
    console.error("Error fetching profile:", profileError)
    // Fallback to user metadata if profile not found
    if (user.user_metadata && user.user_metadata.role) {
      profile = { ...profile, role: user.user_metadata.role }
    } else {
      return NextResponse.json({ error: "Error fetching profile" }, { status: 500 })
    }
  }

  // Fetch orders (optional)
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select(
      `id, created_at, status, total_amount, order_items(
        id, quantity, price, product_id
      )`
    )
    .eq("buyer_id", user.id)
    .order("created_at", { ascending: false })

  if (ordersError) {
    console.error("Error fetching orders:", ordersError)
    // continue — orders are optional, but if you prefer to fail, return 500 here
  }

  const redirectUrl = `/dashboard/${profile.role}`

  return NextResponse.json({ user: { ...user, profile }, orders, redirectUrl }, { status: 200 })
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map((cookie) => ({
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
    error: userErr,
  } = await supabase.auth.getUser()

  if (userErr || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))

  // Build update object only for allowed fields
  const updatePayload: Record<string, any> = {}
  if ("full_name" in body) updatePayload.full_name = body.full_name
  if ("phone" in body) updatePayload.phone = body.phone
  if ("address" in body) updatePayload.address = body.address
  if ("organization_name" in body) updatePayload.organization_name = body.organization_name
  if ("organization_type" in body) updatePayload.organization_type = body.organization_type
  if ("city" in body) updatePayload.city = body.city
  if ("county" in body) updatePayload.county = body.county
  if ("department" in body) updatePayload.department = body.department

  if (Object.keys(updatePayload).length === 0) {
    return NextResponse.json({ error: "No updatable fields provided" }, { status: 400 })
  }

  const { data: updatedProfile, error: updateError } = await supabase
    .from("profiles")
    .update(updatePayload)
    .eq("id", user.id)
    .select("id, full_name, email, role, phone, organization_name, organization_type, address, city, county, department")
    .single()

  if (updateError) {
    console.error("Error updating profile:", updateError)
    return NextResponse.json({ error: "Error updating profile" }, { status: 500 })
  }

  return NextResponse.json({ profile: updatedProfile }, { status: 200 })
}
