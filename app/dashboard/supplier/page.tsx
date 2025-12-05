"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/data"
import { DollarSign, ShoppingBag, Package, AlertTriangle, ArrowRight, Plus } from "lucide-react"
import { useUser } from "@/lib/user-context"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/components/ui/use-toast"
import { createClient } from "@/lib/supabase/client"

interface OrderItem {
  quantity: number
  products: {
    name: string
  } | null
}

interface Order {
  id: string
  created_at: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total_amount: number
  order_items: OrderItem[]
  profiles: {
    full_name: string
  } | null
}

interface LowStockProduct {
  name: string
  stock_count: number
  low_stock_threshold: number
}

interface Stats {
  activeProducts: number
  totalSales: number
}

export default function SupplierDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([])
  const [stats, setStats] = useState<Stats>({ activeProducts: 0, totalSales: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const { profile, supplierProfile, loading: userLoading } = useUser()

  useEffect(() => {
    const fetchData = async () => {
      if (userLoading || !supplierProfile?.id) {
        return
      }

      setLoading(true)
      setError(null)

      const supabase = createClient()
      const supplierId = supplierProfile.id

      try {
        // Fetch Orders
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select(
            `
            id,
            created_at,
            status,
            total_amount,
            order_items (quantity, products (name)),
            profiles (full_name)
            `
          )
          .eq("supplier_id", supplierId)
          .order("created_at", { ascending: false })
          .limit(5)

        if (ordersError) throw ordersError
        setOrders(ordersData || [])

        // Fetch Low Stock Products
        const LOW_STOCK_THRESHOLD = 10
        const { data: lowStockData, error: lowStockError } = await supabase
          .from("products")
          .select(`name, stock_count`)
          .eq("supplier_id", supplierId)
          .lt("stock_count", LOW_STOCK_THRESHOLD)
          .order("stock_count", { ascending: true })

        if (lowStockError) throw lowStockError
        const lowStockProductsWithThreshold = lowStockData?.map(p => ({ ...p, low_stock_threshold: LOW_STOCK_THRESHOLD })) || []
        setLowStockProducts(lowStockProductsWithThreshold)

        // Fetch Stats
        // Active Products
        const { count: activeProductsCount, error: activeProductsError } = await supabase
          .from("products")
          .select("id", { count: "exact" })
          .eq("supplier_id", supplierId)
          .eq("in_stock", true)

        if (activeProductsError) throw activeProductsError

        // Total Sales (sum of total_amount for delivered/paid orders)
        const { data: totalSalesData, error: totalSalesError } = await supabase
          .from("orders")
          .select("total_amount")
          .eq("supplier_id", supplierId)
          .in("payment_status", ["paid", "refunded"])
          .in("status", ["delivered", "shipped"])

        if (totalSalesError) throw totalSalesError

        const totalSales = totalSalesData?.reduce((sum, order) => sum + parseFloat(order.total_amount as any), 0) || 0
        
        setStats({
          activeProducts: activeProductsCount || 0,
          totalSales: totalSales,
        })

      } catch (err: any) {
        setError(err.message)
        toast({
          title: "Error",
          description: `Failed to fetch dashboard data: ${err.message}`,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (!userLoading && supplierProfile?.id) {
      fetchData()
    }
  }, [userLoading, supplierProfile?.id])

  if (loading || userLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        <p>Error: {error}</p>
      </div>
    )
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
        <DashboardHeader type="supplier" userName={supplierProfile?.business_name || "Supplier Dashboard"} />

        <main className="p-4 lg:p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Supplier Dashboard</h1>
            <p className="text-muted-foreground mt-1">Overview of your sales and inventory</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Total Sales"
              value={formatPrice(stats.totalSales)}
              description="This month"
              icon={<DollarSign className="h-5 w-5" />}
              trend={{ value: 15, isPositive: true }}
            />
            <StatsCard
              title="Pending Orders"
              value={orders.filter((order) => order.status === "pending").length.toString()}
              description="Awaiting confirmation"
              icon={<ShoppingBag className="h-5 w-5" />}
            />
            <StatsCard
              title="Active Products"
              value={stats.activeProducts.toString()}
              description="Listed on marketplace"
              icon={<Package className="h-5 w-5" />}
            />
            <StatsCard
              title="Low Stock Alerts"
              value={lowStockProducts.length.toString()}
              description="Need restocking"
              icon={<AlertTriangle className="h-5 w-5" />}
            />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/dashboard/supplier/products/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </Link>
            <Link href="/dashboard/supplier/orders">
              <Button variant="outline">Manage Orders</Button>
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Orders */}
            <div className="lg:col-span-2 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <Link
                  href="/dashboard/supplier/orders"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Buyer</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Total</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <tr key={order.id} className="border-b last:border-0">
                          <td className="px-4 py-3">
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm">{order.profiles?.full_name || "N/A"}</p>
                            <p className="text-xs text-muted-foreground">
                              {order.order_items[0]?.products?.name || "N/A"} × {order.order_items[0]?.quantity || 0}
                            </p>
                          </td>
                          <td className="px-4 py-3 font-medium">{formatPrice(order.total_amount)}</td>
                          <td className="px-4 py-3">
                            <OrderStatusBadge status={order.status} />
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="ghost" size="sm">
                              Manage
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground">No recent orders found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Low Stock Alerts</h2>
                <Link href="/dashboard/supplier/inventory" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="p-4 space-y-4">
                {lowStockProducts.length > 0 ? (
                  lowStockProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-destructive/10">
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">Threshold: {product.low_stock_threshold} units</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${product.stock_count === 0 ? "text-destructive" : "text-chart-4"}`}>
                          {product.stock_count}
                        </p>
                        <p className="text-xs text-muted-foreground">in stock</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">No low stock products.</div>
                )}
                <Button variant="outline" className="w-full bg-transparent">
                  Update Inventory
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
