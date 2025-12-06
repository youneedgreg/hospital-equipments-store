import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import NewProductForm from "./NewProductForm"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default async function NewProductPage() {
  const supabase = await createClient()
  const supabaseAdmin = createAdminClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: categories, error: categoriesError } = await supabaseAdmin
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

  const navItems = [
    { href: "/dashboard/supplier", label: "Overview", icon: "Home" },
    { href: "/dashboard/supplier/products", label: "Products", icon: "Package" },
    { href: "/dashboard/supplier/orders", label: "Orders", icon: "ShoppingCart" },
  ]

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar type="supplier" navItems={navItems} />
      <div className="flex-1 lg:pl-64">
        <DashboardHeader type="supplier" userName={supplier?.business_name} />
        <main className="p-4 lg:p-6">
          <Link
            href="/dashboard/supplier/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
          <NewProductForm categories={categories || []} supplier={supplier} />
        </main>
      </div>
    </div>
  )
}