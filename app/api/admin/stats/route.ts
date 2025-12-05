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
    { data: totalRevenueData, error: totalRevenueError },
    { data: totalOrdersData, error: totalOrdersError },
    { data: activeSuppliersData, error: activeSuppliersError },
    { data: registeredBuyersData, error: registeredBuyersError },
    { data: pendingVerificationsData, error: pendingVerificationsError },
  ] = await Promise.all([
    supabase
      .from("orders")
      .select("total_amount")
      .eq("status", "delivered"),
    supabase.from("orders").select("id"),
    supabase
      .from("profiles")
      .select("id")
      .eq("role", "supplier"),
    supabase
      .from("profiles")
      .select("id")
      .eq("role", "buyer"),
    supabase
      .from("verifications")
      .select("id")
      .eq("status", "pending"),
  ])

  if (
    totalRevenueError ||
    totalOrdersError ||
    activeSuppliersError ||
    registeredBuyersError ||
    pendingVerificationsError
  ) {
    console.error("Error fetching admin stats:", {
      totalRevenueError,
      totalOrdersError,
      activeSuppliersError,
      registeredBuyersError,
      pendingVerificationsError,
    })
    return NextResponse.json({ error: "Error fetching admin stats" }, { status: 500 })
  }

  const totalRevenue = totalRevenueData.reduce((acc, order) => acc + order.total_amount, 0)
  const totalOrders = totalOrdersData.length
  const activeSuppliers = activeSuppliersData.length
  const registeredBuyers = registeredBuyersData.length
  const pendingVerifications = pendingVerificationsData.length

  return NextResponse.json({
    totalRevenue,
    totalOrders,
    activeSuppliers,
    registeredBuyers,
    pendingVerifications,
  })
}
