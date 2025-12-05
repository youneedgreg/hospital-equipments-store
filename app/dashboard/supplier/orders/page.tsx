"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatPrice } from "@/lib/data"
import { Search, Check, Truck, Package } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { createClient } from "@/lib/supabase/client"
import { useUser } from "@/lib/user-context"

// Define interfaces for the fetched data
interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  products: { // Nested product data from join
    name: string;
  } | null;
}

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  created_at: string; // Date string
  profiles: { // Nested profile data for buyer
    full_name: string;
    email: string;
  } | null;
  order_items: OrderItem[]; // Array of order items
}


export default function SupplierOrdersPage() {
    const { supplierProfile, loading: userLoading } = useUser()
    const [isClient, setIsClient] = useState(false)
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        const fetchOrders = async () => {
            if (!supplierProfile?.id) {
                setLoading(false)
                return
            }

            const supabase = createClient()
            const supplierId = supplierProfile.id

            let { data, error } = await supabase
                .from("orders")
                .select(
                    `
                    id,
                    order_number,
                    total_amount,
                    status,
                    payment_status,
                    created_at,
                    profiles (full_name, email),
                    order_items (id, quantity, price, products (name))
                    `
                )
                .eq("supplier_id", supplierId)
                .order("created_at", { ascending: false })

            if (error) {
                setError(error.message)
                setLoading(false)
                console.error("Error fetching orders:", error)
                return
            }

            setOrders(data as Order[] || [])
            setLoading(false)
        }

        if (!userLoading) {
            fetchOrders()
        }
    }, [supplierProfile, userLoading])

  const navItems = [
    { href: "/dashboard/supplier", label: "Overview", icon: "Home" },
    { href: "/dashboard/supplier/products", label: "Products", icon: "Package" },
    { href: "/dashboard/supplier/orders", label: "Orders", icon: "ShoppingCart" },
  ]

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

    useEffect(() => {
        if (orders.length > 0 && selectedOrder === null) {
            setSelectedOrder(orders[0].id)
        }
    }, [orders, selectedOrder])


  const filteredOrders = orders.filter((order) => {
    if (!order || !order.order_number || !order.profiles?.full_name) {
        return false;
    }
    const matchesSearch =
      order.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.profiles.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const orderDetails = selectedOrder ? orders.find((o) => o.id === selectedOrder) : null

  if (userLoading || loading) {
    return (
        <div className="flex min-h-screen">
            <DashboardSidebar userType="supplier" navItems={navItems} />
            <div className="flex-1 lg:pl-64">
                <DashboardHeader type="supplier" userName="MedSupply Kenya" />
                <main className="p-4 lg:p-6">
                    <Skeleton className="h-8 w-1/4 mb-1" />
                    <Skeleton className="h-4 w-1/2 mb-6" />
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <Skeleton className="h-10 w-full max-w-sm" />
                        <Skeleton className="h-10 w-44" />
                    </div>
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <Skeleton className="h-96" />
                        </div>
                        <div className="lg:col-span-1">
                            <Skeleton className="h-96" />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
  }

  if (error) return <p className="text-destructive">Error: {error}</p>

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar userType="supplier" navItems={navItems} />
      <div className="flex-1 lg:pl-64">
        <DashboardHeader type="supplier" userName="MedSupply Kenya" />

        <main className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground mt-1">Manage and fulfill buyer orders</p>
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
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
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
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Buyer</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Total</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr
                          key={order.id}
                          className={`border-b last:border-0 cursor-pointer transition-colors ${selectedOrder === order.id ? "bg-muted/50" : "hover:bg-muted/30"}`}
                          onClick={() => setSelectedOrder(order.id)}
                        >
                          <td className="px-4 py-3">
                            <p className="font-medium">{order.order_number}</p>
                            <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                          </td>
                          <td className="px-4 py-3 text-sm">{order.profiles?.full_name || "N/A"}</td>
                          <td className="px-4 py-3 font-medium">{formatPrice(order.total_amount)}</td>
                          <td className="px-4 py-3">
                            <OrderStatusBadge status={order.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredOrders.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No orders found</p>
                  </div>
                )}
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
                      <p className="font-medium">{orderDetails.order_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Buyer</p>
                      <p className="font-medium">{orderDetails.profiles?.full_name || "N/A"}</p>
                      <p className="text-sm text-muted-foreground">{orderDetails.profiles?.email || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{new Date(orderDetails.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className="flex gap-2 mt-1">
                        <OrderStatusBadge status={orderDetails.payment_status} type="payment" />
                        <OrderStatusBadge status={orderDetails.status} type="order" />
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm font-medium mb-2">Items</p>
                      <div className="space-y-2">
                        {orderDetails.order_items.map((item, index) => (
                          <div key={item.id || index} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.products?.name || "Unknown Product"} × {item.quantity}
                            </span>
                            <span>{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">{formatPrice(orderDetails.total_amount)}</span>
                    </div>
                  </div>

                  {/* Status Update Buttons */}
                  <div className="mt-6 space-y-2">
                    <p className="text-sm font-medium">Update Status</p>
                    {orderDetails.status === "pending" && (
                      <Button className="w-full" size="sm">
                        <Check className="h-4 w-4 mr-2" />
                        Confirm Order
                      </Button>
                    )}
                    {orderDetails.status === "confirmed" && (
                      <Button className="w-full" size="sm">
                        <Package className="h-4 w-4 mr-2" />
                        Mark as Processing
                      </Button>
                    )}
                    {orderDetails.status === "processing" && (
                      <Button className="w-full" size="sm">
                        <Truck className="h-4 w-4 mr-2" />
                        Mark as Shipped
                      </Button>
                    )}
                    {orderDetails.status === "shipped" && (
                      <Button className="w-full" size="sm" variant="secondary">
                        <Check className="h-4 w-4 mr-2" />
                        Mark as Delivered
                      </Button>
                    )}
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      Contact Buyer
                    </Button>
                  </div>
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