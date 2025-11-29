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

const ordersData = [
  {
    id: "BIO-12345678",
    buyer: "Nairobi Regional Hospital",
    buyerEmail: "procurement@nairobihospital.co.ke",
    items: [{ name: "Electric Hospital Bed - ICU Grade", quantity: 2, price: 570000 }],
    total: 570000,
    date: "Nov 20, 2025",
    status: "pending" as const,
    paymentStatus: "paid" as const,
  },
  {
    id: "BIO-12345677",
    buyer: "HealthFirst Clinics",
    buyerEmail: "orders@healthfirst.co.ke",
    items: [{ name: "N95 Respirator Masks - Box of 50", quantity: 20, price: 90000 }],
    total: 90000,
    date: "Nov 19, 2025",
    status: "confirmed" as const,
    paymentStatus: "paid" as const,
  },
  {
    id: "BIO-12345676",
    buyer: "Mombasa Medical Center",
    buyerEmail: "supplies@mombasamedical.co.ke",
    items: [{ name: "Patient Monitor - 6 Parameter", quantity: 3, price: 495000 }],
    total: 495000,
    date: "Nov 18, 2025",
    status: "shipped" as const,
    paymentStatus: "paid" as const,
  },
  {
    id: "BIO-12345675",
    buyer: "Kenya Red Cross",
    buyerEmail: "logistics@redcross.or.ke",
    items: [{ name: "Wheelchair - Foldable Standard", quantity: 10, price: 280000 }],
    total: 280000,
    date: "Nov 17, 2025",
    status: "delivered" as const,
    paymentStatus: "paid" as const,
  },
  {
    id: "BIO-12345674",
    buyer: "Eldoret Teaching Hospital",
    buyerEmail: "procurement@eldorethospital.co.ke",
    items: [{ name: "Surgical Instrument Set - General Surgery", quantity: 2, price: 250000 }],
    total: 250000,
    date: "Nov 16, 2025",
    status: "pending" as const,
    paymentStatus: "pending" as const,
  },
]

export default function SupplierOrdersPage() {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(ordersData[0]?.id || null)

  const filteredOrders = ordersData.filter((order) => {
    if (!order || !order.id || !order.buyer) {
        return false;
    }
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const orderDetails = selectedOrder ? ordersData.find((o) => o.id === selectedOrder) : null

  if (!isClient) {
    return (
        <div className="flex min-h-screen">
            <DashboardSidebar type="supplier" navItems={[]} />
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

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar type="supplier" navItems={[]} />
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
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </td>
                          <td className="px-4 py-3 text-sm">{order.buyer}</td>
                          <td className="px-4 py-3 font-medium">{formatPrice(order.total)}</td>
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
                      <p className="font-medium">{orderDetails.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Buyer</p>
                      <p className="font-medium">{orderDetails.buyer}</p>
                      <p className="text-sm text-muted-foreground">{orderDetails.buyerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{orderDetails.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className="flex gap-2 mt-1">
                        <OrderStatusBadge status={orderDetails.paymentStatus} type="payment" />
                        <OrderStatusBadge status={orderDetails.status} type="order" />
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm font-medium mb-2">Items</p>
                      <div className="space-y-2">
                        {orderDetails.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.name} × {item.quantity}
                            </span>
                            <span>{formatPrice(item.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">{formatPrice(orderDetails.total)}</span>
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