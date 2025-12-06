import { createClient } from "@/lib/supabase/server"
import NewProductForm from "./NewProductForm"

export default async function NewProductPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("*")

  const { data: supplier, error: supplierError } = await supabase
    .from("suppliers")
    .select("business_name")
    .eq("profile_id", user?.id)
    .single()

  if (categoriesError || supplierError) {
    console.error("Error fetching data:", categoriesError || supplierError)
    return <div>Error fetching data.</div>
  }

  return <NewProductForm categories={categories} supplier={supplier} />
}