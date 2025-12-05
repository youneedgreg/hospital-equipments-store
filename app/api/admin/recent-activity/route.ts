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

  if (profileError || !profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const [
    { data: recentOrdersData, error: recentOrdersError },
    { data: pendingVerificationsData, error: pendingVerificationsError },
  ] = await Promise.all([
    supabase
      .from("orders")
      .select(
        `
        id,
        created_at,
        status,
        total_amount,
        profiles (
          full_name
        )
      `
      )
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("verifications")
      .select(
        `
        id,
        created_at,
        status,
        profiles (
          full_name
        )
      `
      )
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(5),
  ])

  if (recentOrdersError || pendingVerificationsError) {
    console.error("Error fetching admin recent activity:", {
      recentOrdersError,
      pendingVerificationsError,
    })
    return NextResponse.json({ error: "Error fetching admin recent activity" }, { status: 500 })
  }

  return NextResponse.json({
    recentOrders: recentOrdersData,
    pendingVerifications: pendingVerificationsData,
  })
}
