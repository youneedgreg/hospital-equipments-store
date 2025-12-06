import { createClient } from "./client";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image_url?: string;
  category_id: string;
  supplier_id?: string;
  in_stock: boolean;
  stock_count?: number;
  rating: number;
  review_count: number;
  specifications?: Record<string, string>;
  features?: string[];
  categories?: {
    id: string;
    name: string;
  };
  suppliers?: {
    id: string;
    business_name: string;
    rating: number;
    verification_status: string;
  };
  created_at?: string;
  updated_at?: string;
}

export async function getProducts(): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      categories (name),
      suppliers (business_name, rating, verification_status)
    `
    )
    .returns<Product[]>();

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data || [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      categories (name),
      suppliers (business_name, rating, verification_status)
      `
    )
    .eq("id", id)
    .single()
    .returns<Product>();

  if (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }

  return data;
}
