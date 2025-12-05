"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createOrder(items: Array<{ productId: string; quantity: number; price: number }>, shippingAddress: string) {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: "Not authenticated" }
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single()

  if (!profile) {
    return { data: null, error: "Profile not found" }
  }

  // Calculate total
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Generate order number
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

  // Get supplier ID from first product
  const { data: firstProduct } = await supabase
    .from("products")
    .select("supplier_id")
    .eq("id", items[0].productId)
    .single()

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      buyer_id: profile.id,
      supplier_id: firstProduct?.supplier_id,
      total_amount: totalAmount,
      shipping_address: shippingAddress,
      payment_status: "pending",
      status: "pending",
    })
    .select()
    .single()

  if (orderError) {
    console.error("Error creating order:", orderError)
    return { data: null, error: orderError.message }
  }

  // Create order items
  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    quantity: item.quantity,
    price: item.price,
  }))

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

  if (itemsError) {
    console.error("Error creating order items:", itemsError)
    return { data: null, error: itemsError.message }
  }

  revalidatePath("/dashboard/buyer/orders")
  return { data: order, error: null }
}

export async function getOrders(userRole: "buyer" | "supplier" | "admin") {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { data: null, error: "Not authenticated" }
  }

  let query = supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        products:product_id (
          id,
          name,
          image_url
        )
      ),
      profiles:buyer_id (
        id,
        full_name,
        email
      ),
      suppliers:supplier_id (
        id,
        business_name
      )
    `)
    .order("created_at", { ascending: false })

  if (userRole === "buyer") {
    query = query.eq("buyer_id", user.id)
  } else if (userRole === "supplier") {
    // Get supplier ID
    const { data: supplier } = await supabase
      .from("suppliers")
      .select("id")
      .eq("profile_id", user.id)
      .single()

    if (supplier) {
      query = query.eq("supplier_id", supplier.id)
    }
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching orders:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single()

  if (error) {
    console.error("Error updating order:", error)
    return { data: null, error: error.message }
  }

  revalidatePath("/dashboard")
  return { data, error: null }
}


