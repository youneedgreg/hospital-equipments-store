"use client"

import { useState } from "react"
import { Search, Eye, Download, Package, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import Link from "next/link"

// Mock orders data
const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "In Transit",
    total: 102486.8,
    items: 3,
    estimatedDelivery: "2024-01-18",
    trackingNumber: "1Z999AA1234567890",
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-10",
    status: "Delivered",
    total: 59797.4,
    items: 2,
    estimatedDelivery: "2024-01-13",
    trackingNumber: "1Z999AA1234567891",
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-05",
    status: "Processing",
    total: 376998.7,
    items: 1,
    estimatedDelivery: "2024-01-20",
    trackingNumber: "1Z999AA1234567892",
  },
  {
    id: "ORD-2023-045",
    date: "2023-12-28",
    status: "Delivered",
    total: 24698.7,
    items: 1,
    estimatedDelivery: "2023-12-30",
    trackingNumber: "1Z999AA1234567893",
  },
  {
    id: "ORD-2023-044",
    date: "2023-12-20",
    status: "Delivered",
    total: 88396.1,
    items: 4,
    estimatedDelivery: "2023-12-23",
    trackingNumber: "1Z999AA1234567894",
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "in transit":
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()

    let matchesTime = true
    if (timeFilter !== "all") {
      const orderDate = new Date(order.date)
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - orderDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      switch (timeFilter) {
        case "30days":
          matchesTime = diffDays <= 30
          break
        case "90days":
          matchesTime = diffDays <= 90
          break
        case "year":
          matchesTime = diffDays <= 365
          break
      }
    }

    return matchesSearch && matchesStatus && matchesTime
  })

  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
            <p className="text-muted-foreground">Track and manage your medical equipment orders</p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search by order ID or tracking number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="in transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 90 Days</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Orders Found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || statusFilter !== "all" || timeFilter !== "all"
                    ? "No orders match your current filters."
                    : "You haven't placed any orders yet."}
                </p>
                <Button asChild>
                  <Link href="/products">Browse Products</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold text-foreground text-lg">{order.id}</h3>
                            <p className="text-sm text-muted-foreground">
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={getStatusColor(order.status)} variant="secondary">
                            {order.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Total Amount</p>
                            <p className="font-medium text-foreground">KES {order.total}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Items</p>
                            <p className="font-medium text-foreground">{order.items} items</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">
                              {order.status === "Delivered" ? "Delivered" : "Est. Delivery"}
                            </p>
                            <p className="font-medium text-foreground">
                              {new Date(order.estimatedDelivery).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {order.status !== "Delivered" && (
                          <div className="text-sm">
                            <p className="text-muted-foreground">Tracking Number</p>
                            <p className="font-mono text-foreground">{order.trackingNumber}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" size="sm" asChild className="bg-transparent">
                          <Link href={`/orders/${order.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            Track Order
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Download className="w-4 h-4 mr-2" />
                          Invoice
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Order Summary Stats */}
          {filteredOrders.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Order Summary
                </CardTitle>
                <CardDescription>Your ordering statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{filteredOrders.length}</p>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">
                      KES {filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">
                      {filteredOrders.reduce((sum, order) => sum + order.items, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Items Purchased</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">
                      {filteredOrders.filter((order) => order.status === "Delivered").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Delivered Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
