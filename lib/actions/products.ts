"use server"

import { createClient } from "@/lib/supabase/server"

export async function getProducts(filters?: {
  categoryId?: string
  supplierId?: string
  search?: string
  limit?: number
  offset?: number
}) {
  const supabase = await createClient()

  let query = supabase
    .from("products")
    .select(`
      *,
      categories:category_id (
        id,
        name
      ),
      suppliers:supplier_id (
        id,
        business_name,
        rating,
        verification_status
      )
    `)
    .eq("in_stock", true)

  if (filters?.categoryId) {
    query = query.eq("category_id", filters.categoryId)
  }

  if (filters?.supplierId) {
    query = query.eq("supplier_id", filters.supplierId)
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function getProduct(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories:category_id (
        id,
        name
      ),
      suppliers:supplier_id (
        id,
        business_name,
        rating,
        location,
        verification_status
      )
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching product:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function getCategories() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return { data: null, error: error.message }
  }

  // Get product counts for each category
  const categoriesWithCounts = await Promise.all(
    (data || []).map(async (category) => {
      const { count } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("category_id", category.id)
        .eq("in_stock", true)

      return {
        ...category,
        count: count || 0,
      }
    })
  )

  return { data: categoriesWithCounts, error: null }
}

export async function getSuppliers() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("suppliers")
    .select(`
      *,
      profiles:profile_id (
        id,
        email
      )
    `)
    .eq("verification_status", "verified")
    .order("rating", { ascending: false })

  if (error) {
    console.error("Error fetching suppliers:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function getSupplier(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("suppliers")
    .select(`
      *,
      profiles:profile_id (
        id,
        email,
        full_name
      )
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching supplier:", error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}


