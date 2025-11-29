"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatPrice } from "@/lib/data"
import { Search, Eye } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/components/ui/use-toast"

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

export default function BuyerOrdersPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loadingPage, setLoadingPage] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const { toast } = useToast()

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
        setLoadingPage(false)
      }
    }

    fetchUserData()
  }, [toast])

  if (loadingPage) {
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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.order_items.some((item) =>
        item.products.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const orderDetails = selectedOrder ? orders.find((o) => o.id === selectedOrder) : null

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar type="buyer" navItems={[]} />
      <div className="flex-1 lg:pl-64">
        <DashboardHeader type="buyer" userName={user.profile.full_name || "Buyer"} />

        <main className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
            <p className="text-muted-foreground mt-1">View and track all your orders</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Orders List */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Total</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-muted-foreground">
                            No orders found.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr
                            key={order.id}
                            className={`border-b last:border-0 cursor-pointer transition-colors ${selectedOrder === order.id ? "bg-muted/50" : "hover:bg-muted/30"}`}
                            onClick={() => setSelectedOrder(order.id)}
                          >
                            <td className="px-4 py-3">
                              <span className="font-medium">{order.id}</span>
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 font-medium">{formatPrice(order.total_amount)}</td>
                            <td className="px-4 py-3">
                              <OrderStatusBadge status={order.status} type="order" />
                            </td>
                            <td className="px-4 py-3 text-right">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Order Details Panel */}
            <div className="lg:col-span-1">
              {orderDetails ? (
                <div className="rounded-xl border border-border bg-card p-6 sticky top-20">
                  <h2 className="text-lg font-semibold mb-4">Order Details</h2>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-medium">{orderDetails.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{new Date(orderDetails.created_at).toLocaleDateString()}</p>
                    </div>
                    {/* Assuming supplier info is not directly in order for now */}
                    {/* <div>
                      <p className="text-sm text-muted-foreground">Supplier</p>
                      <p className="font-medium">{orderDetails.supplier}</p>
                    </div> */}
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className="flex gap-2 mt-1">
                        <OrderStatusBadge status={orderDetails.status} type="order" />
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm font-medium mb-2">Items</p>
                      <div className="space-y-2">
                        {orderDetails.order_items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.products.name} × {item.quantity}
                            </span>
                            <span>{formatPrice(item.products.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">{formatPrice(orderDetails.total_amount)}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-transparent" variant="outline">
                    Download Invoice
                  </Button>
                </div>
              ) : (
                <div className="rounded-xl border border-border bg-card p-6 text-center">
                  <p className="text-muted-foreground">Select an order to view details</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
