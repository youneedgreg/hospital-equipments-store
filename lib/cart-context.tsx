"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import { addToCart as addToCartAction, updateCartItem, removeFromCart, clearCart as clearCartAction } from "@/lib/actions/cart"
import type { Product } from "./data"

export interface CartItem {
  product: Product
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  totalItems: number
  subtotal: number
  loading: boolean
  refresh: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const refresh = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        // For non-authenticated users, use localStorage as fallback
        const localCart = localStorage.getItem("cart")
        if (localCart) {
          try {
            const parsed = JSON.parse(localCart)
            setItems(parsed)
          } catch {
            setItems([])
          }
        } else {
          setItems([])
        }
        setLoading(false)
        return
      }

      // Fetch cart from Supabase
      const { data: cartItems, error } = await supabase
        .from("cart_items")
        .select(`
          *,
          products:product_id (
            id,
            name,
            description,
            price,
            original_price,
            image_url,
            category_id,
            supplier_id,
            in_stock,
            stock_count,
            rating,
            review_count,
            specifications,
            features
          )
        `)
        .eq("user_id", user.id)

      if (error) {
        console.error("Error fetching cart:", error)
        setItems([])
      } else {
        const formattedItems: CartItem[] = (cartItems || []).map((item: any) => ({
          product: item.products as Product,
          quantity: item.quantity,
        }))
        setItems(formattedItems)
      }
    } catch (error) {
      console.error("Error refreshing cart:", error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    refresh()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      refresh()
    })

    return () => subscription.unsubscribe()
  }, [refresh, supabase])

  const addItem = useCallback(async (product: Product, quantity = 1) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      // Add to Supabase
      await addToCartAction(product.id, quantity)
      await refresh()
    } else {
      // Add to localStorage for non-authenticated users
      setItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.product.id === product.id)
        let newItems: CartItem[]
        if (existingItem) {
          newItems = prevItems.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
          )
        } else {
          newItems = [...prevItems, { product, quantity }]
        }
        localStorage.setItem("cart", JSON.stringify(newItems))
        return newItems
      })
    }
  }, [supabase, refresh])

  const removeItem = useCallback(async (productId: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      await removeFromCart(productId)
      await refresh()
    } else {
      setItems((prevItems) => {
        const newItems = prevItems.filter((item) => item.product.id !== productId)
        localStorage.setItem("cart", JSON.stringify(newItems))
        return newItems
      })
    }
  }, [supabase, refresh])

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    if (quantity < 1) {
      await removeItem(productId)
      return
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      await updateCartItem(productId, quantity)
      await refresh()
    } else {
      setItems((prevItems) => {
        const newItems = prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
        localStorage.setItem("cart", JSON.stringify(newItems))
        return newItems
      })
    }
  }, [supabase, refresh, removeItem])

  const clearCart = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      await clearCartAction()
      await refresh()
    } else {
      setItems([])
      localStorage.removeItem("cart")
    }
  }, [supabase, refresh])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal, loading, refresh }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
