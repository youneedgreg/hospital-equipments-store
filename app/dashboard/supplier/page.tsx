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

interface OrderItem {
  quantity: number
  products: {
    name: string
  }
}

interface Order {
  id: string
  created_at: string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  total_amount: number
  order_items: OrderItem[]
  profiles: {
    full_name: string
  }
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
      try {
        const [ordersResponse, lowStockResponse, statsResponse] = await Promise.all([
          fetch("/api/supplier/orders"),
          fetch("/api/supplier/low-stock"),
          fetch("/api/supplier/stats"),
        ])

        if (!ordersResponse.ok) {
          const errorData = await ordersResponse.json()
          throw new Error(errorData.error || "Failed to fetch orders")
        }

        if (!lowStockResponse.ok) {
          const errorData = await lowStockResponse.json()
          throw new Error(errorData.error || "Failed to fetch low stock products")
        }

        if (!statsResponse.ok) {
          const errorData = await statsResponse.json()
          throw new Error(errorData.error || "Failed to fetch stats")
        }

        const ordersData = await ordersResponse.json()
        const lowStockData = await lowStockResponse.json()
        const statsData = await statsResponse.json()

        setOrders(ordersData.orders)
        setLowStockProducts(lowStockData.products)
        setStats(statsData)
      } catch (err: any) {
        setError(err.message)
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

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

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar type="supplier" navItems={[]} />
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
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0">
                        <td className="px-4 py-3">
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm">{order.profiles.full_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.order_items[0].products.name} × {order.order_items[0].quantity}
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
                    ))}
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
                {lowStockProducts.map((product, index) => (
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
                ))}
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
