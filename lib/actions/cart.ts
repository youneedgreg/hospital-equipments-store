"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getCartItems() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { data: [], error: null }
  }

  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      *,
      products:product_id (
        *
      )
    `)
    .eq("user_id", user.id)

  if (error) {
    console.error("Error fetching cart items:", error)
    return { data: [], error: error.message }
  }

  return { data: data || [], error: null }
}

export async function addToCart(productId: string, quantity: number = 1) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  // Check if item already exists
  const { data: existing } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single()

  if (existing) {
    // Update quantity
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + quantity })
      .eq("id", existing.id)
  } else {
    // Insert new item
    const { error } = await supabase.from("cart_items").insert({
      user_id: user.id,
      product_id: productId,
      quantity,
    })

    if (error) {
      console.error("Error adding to cart:", error)
      return { error: error.message }
    }
  }

  revalidatePath("/", "layout")
  return { error: null }
}

export async function updateCartItem(productId: string, quantity: number) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  if (quantity <= 0) {
    return removeFromCart(productId)
  }

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("user_id", user.id)
    .eq("product_id", productId)

  if (error) {
    console.error("Error updating cart item:", error)
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  return { error: null }
}

export async function removeFromCart(productId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", productId)

  if (error) {
    console.error("Error removing from cart:", error)
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  return { error: null }
}

export async function clearCart() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("cart_items").delete().eq("user_id", user.id)

  if (error) {
    console.error("Error clearing cart:", error)
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  return { error: null }
}

