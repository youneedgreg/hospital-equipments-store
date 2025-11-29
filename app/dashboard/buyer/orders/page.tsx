"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatPrice } from "@/lib/data"
import { Search, Eye } from "lucide-react"

const orders = [
  {
    id: "BIO-12345678",
    date: "Nov 20, 2025",
    items: [
      { name: "Electric Hospital Bed - ICU Grade", quantity: 1, price: 285000 },
      { name: "Patient Monitor - 6 Parameter", quantity: 1, price: 165000 },
      { name: "Wheelchair - Foldable Standard", quantity: 2, price: 56000 },
    ],
    total: 506000,
    paymentStatus: "paid" as const,
    orderStatus: "shipped" as const,
    supplier: "MedSupply Kenya Ltd",
  },
  {
    id: "BIO-12345677",
    date: "Nov 18, 2025",
    items: [{ name: "N95 Respirator Masks - Box of 50", quantity: 10, price: 45000 }],
    total: 45000,
    paymentStatus: "paid" as const,
    orderStatus: "delivered" as const,
    supplier: "HealthTech Africa",
  },
  {
    id: "BIO-12345676",
    date: "Nov 15, 2025",
    items: [{ name: "Electric Hospital Bed - ICU Grade", quantity: 1, price: 285000 }],
    total: 285000,
    paymentStatus: "pending" as const,
    orderStatus: "pending" as const,
    supplier: "MedSupply Kenya Ltd",
  },
  {
    id: "BIO-12345675",
    date: "Nov 10, 2025",
    items: [
      { name: "Disposable Syringes 5ml - Box of 100", quantity: 20, price: 24000 },
      { name: "Examination Gloves - Nitrile Box 100", quantity: 5, price: 8000 },
    ],
    total: 32000,
    paymentStatus: "paid" as const,
    orderStatus: "delivered" as const,
    supplier: "HealthTech Africa",
  },
  {
    id: "BIO-12345674",
    date: "Nov 5, 2025",
    items: [{ name: "Digital Stethoscope - Bluetooth", quantity: 5, price: 92500 }],
    total: 92500,
    paymentStatus: "paid" as const,
    orderStatus: "delivered" as const,
    supplier: "Kenyan Medical Supplies",
  },
]

export default function BuyerOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.orderStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  const orderDetails = selectedOrder ? orders.find((o) => o.id === selectedOrder) : null

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar type="buyer" navItems={[]} />
      <div className="flex-1 lg:pl-64">
        <DashboardHeader type="buyer" userName="Dr. Sarah Wanjiku" />

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
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
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
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Total</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Payment</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Action</th>
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
                            <span className="font-medium">{order.id}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{order.date}</td>
                          <td className="px-4 py-3 font-medium">{formatPrice(order.total)}</td>
                          <td className="px-4 py-3">
                            <OrderStatusBadge status={order.paymentStatus} type="payment" />
                          </td>
                          <td className="px-4 py-3">
                            <OrderStatusBadge status={order.orderStatus} type="order" />
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
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
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{orderDetails.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Supplier</p>
                      <p className="font-medium">{orderDetails.supplier}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className="flex gap-2 mt-1">
                        <OrderStatusBadge status={orderDetails.paymentStatus} type="payment" />
                        <OrderStatusBadge status={orderDetails.orderStatus} type="order" />
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
