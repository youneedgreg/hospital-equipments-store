"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"
import { Button } from "@/components/ui/button"
import { formatPrice, getProductById, mapProductToLegacy } from "@/lib/data"
import { ShoppingBag, Package, Truck, CheckCircle, ArrowRight, ShoppingCart } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"

interface OrderItem {
  id: string
  quantity: number
  products: {
    id: string
    name: string
    price: number
    image_url: string | null
  }
}

interface Order {
  id: string
  created_at: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total_amount: number
  order_items: OrderItem[]
}

interface UserProfile {
  id: string
  full_name: string | null
  email: string | null
  role: string | null
  phone_number: string | null
  address: string | null
}

interface UserData {
  user: {
    id: string
    email: string | null
    profile: UserProfile
  }
  orders: Order[]
}

export default function BuyerDashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const { addToCart } = useCart()

  const handleReorder = (order: Order) => {
    order.order_items.forEach((item) => {
      const product = getProductById(item.products.id)
      if (product) {
        const legacyProduct = mapProductToLegacy(product)
        addToCart(legacyProduct, item.quantity)
      }
    })
    toast({
      title: "Order Reordered",
      description: "The items from your previous order have been added to your cart.",
    })
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user")
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch user data")
        }
        const data: UserData = await response.json()
        setUserData(data)
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

    fetchUserData()
  }, [toast])

  if (loading) {
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

  const { user, orders } = userData || { user: null, orders: [] }

  if (!user || !user.profile) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        <p>User data not found. Please log in again.</p>
      </div>
    )
  }

  const totalOrders = orders.length
  const inProgressOrders = orders.filter(
    (order) => order.status === "pending" || order.status === "processing"
  ).length
  const inTransitOrders = orders.filter((order) => order.status === "shipped").length
  const deliveredOrders = orders.filter((order) => order.status === "delivered").length

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar type="buyer" navItems={[]} />
      <div className="flex-1 lg:pl-64">
        <DashboardHeader type="buyer" userName={user.profile.full_name || "Buyer"} />

        <main className="p-4 lg:p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user.profile.full_name || "Buyer"}!</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your orders today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Total Orders"
              value={totalOrders.toString()}
              description="All time orders"
              icon={<ShoppingBag className="h-5 w-5" />}
            />
            <StatsCard
              title="In Progress"
              value={inProgressOrders.toString()}
              description="Being processed"
              icon={<Package className="h-5 w-5" />}
            />
            <StatsCard title="In Transit" value={inTransitOrders.toString()} description="On the way" icon={<Truck className="h-5 w-5" />} />
            <StatsCard
              title="Delivered"
              value={deliveredOrders.toString()}
              description="Successfully received"
              icon={<CheckCircle className="h-5 w-5" />}
            />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/products">
              <Button>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Browse Products
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="outline">View Cart</Button>
            </Link>
          </div>

          {/* Recent Orders */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <Link
                href="/dashboard/buyer/orders"
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
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Items</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Total</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-muted-foreground">
                        No recent orders found.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0">
                        <td className="px-4 py-3">
                          <span className="font-medium">{order.id}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm">{order.order_items.length} items</td>
                        <td className="px-4 py-3 font-medium">{formatPrice(order.total_amount)}</td>
                        <td className="px-4 py-3">
                          <OrderStatusBadge status={order.status} type="order" />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleReorder(order)}>
                            Reorder
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
