// Utility functions to transform Supabase data to match application types

import type { Product } from "../data"

export function transformProduct(supabaseProduct: any): Product {
  return {
    id: supabaseProduct.id,
    name: supabaseProduct.name,
    description: supabaseProduct.description || "",
    price: Number(supabaseProduct.price),
    originalPrice: supabaseProduct.original_price ? Number(supabaseProduct.original_price) : undefined,
    image: supabaseProduct.image_url || "/placeholder.svg",
    category: supabaseProduct.categories?.name || supabaseProduct.category_id || "",
    supplier: supabaseProduct.suppliers?.business_name || "",
    supplierRating: Number(supabaseProduct.suppliers?.rating || 0),
    inStock: supabaseProduct.in_stock ?? true,
    stockCount: supabaseProduct.stock_count || 0,
    rating: Number(supabaseProduct.rating || 0),
    reviewCount: supabaseProduct.review_count || 0,
    specifications: supabaseProduct.specifications || {},
    features: supabaseProduct.features || [],
  }
}

export function transformProducts(supabaseProducts: any[]): Product[] {
  return supabaseProducts.map(transformProduct)
}


