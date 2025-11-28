"use client"

import React, { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardMobileNav } from "@/components/dashboard/dashboard-mobile-nav"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Users,
  Package,
  ShoppingCart,
  Building2,
  ShieldCheck,
  BarChart3,
  Search,
  Eye,
  Calendar,
} from "lucide-react"

const adminNavItems = [
  { href: "/dashboard/admin", label: "Overview", icon: <BarChart3 className="h-4 w-4" /> },
  { href: "/dashboard/admin/users", label: "Users", icon: <Users className="h-4 w-4" /> },
  { href: "/dashboard/admin/suppliers", label: "Suppliers", icon: <Building2 className="h-4 w-4" /> },
  { href: "/dashboard/admin/products", label: "Products", icon: <Package className="h-4 w-4" /> },
  { href: "/dashboard/admin/orders", label: "Orders", icon: <ShoppingCart className="h-4 w-4" /> },
  { href: "/dashboard/admin/verifications", label: "Verifications", icon: <ShieldCheck className="h-4 w-4" /> },
  { href: "/dashboard/admin/reports", label: "Reports", icon: <BarChart3 className="h-4 w-4" /> },
]

const orders = [
  {
    id: "ORD-2024-001",
    buyer: "Nairobi Hospital",
    supplier: "MediSupply Kenya",
    amount: 125_000,
    status: "completed",
    date: "2024-01-15",
    items: [
      { name: "Digital Blood Pressure Monitor", qty: 10, price: 8_500 },
      { name: "Disposable Surgical Masks (Box)", qty: 50, price: 850 },
    ],
    paymentMethod: "MPesa",
    paymentStatus: "paid",
  },
  {
    id: "ORD-2024-002",
    buyer: "Kenyatta National Hospital",
    supplier: "LabEquip Africa",
    amount: 89_500,
    status: "processing",
    date: "2024-01-15",
    items: [
      { name: "Laboratory Centrifuge", qty: 2, price: 35_000 },
      { name: "Test Tubes (Pack of 100)", qty: 10, price: 1_950 },
    ],
    paymentMethod: "Bank Transfer",
    paymentStatus: "paid",
  },
  {
    id: "ORD-2024-003",
    buyer: "Mombasa Clinic",
    supplier: "PharmaCare Ltd",
    amount: 45_000,
    status: "pending",
    date: "2024-01-14",
    items: [
      { name: "First Aid Kit - Professional", qty: 15, price: 3_000 },
    ],
    paymentMethod: "MPesa",
    paymentStatus: "pending",
  },
  {
    id: "ORD-2024-004",
    buyer: "Eldoret Medical Center",
    supplier: "MediSupply Kenya",
    amount: 156_000,
    status: "shipped",
    date: "2024-01-14",
    items: [
      { name: "Patient Monitor", qty: 1, price: 85_000 },
      { name: "Pulse Oximeter", qty: 5, price: 12_500 },
    ],
    paymentMethod: "Bank Transfer",
    paymentStatus: "paid",
  },
  {
    id: "ORD-2024-005",
    buyer: "Kisumu City Clinic",
    supplier: "LabEquip Africa",
    amount: 67_800,
    status: "cancelled",
    date: "2024-01-13",
    items: [
      { name: "Microscope - Binocular", qty: 2, price: 28_500 },
    ],
    paymentMethod: "MPesa",
    paymentStatus: "refunded",
  },
]

export default function AdminOrdersPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] =
    useState<(typeof orders)[number] | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const filteredOrders = orders.filter((order) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      order.id.toLowerCase().includes(q) ||
      order.buyer.toLowerCase().includes(q) ||
      order.supplier.toLowerCase().includes(q)

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Completed
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Processing
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            Pending
          </Badge>
        )
      case "shipped":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
            Shipped
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge
            variant="outline"
            className="border-green-300 text-green-700"
          >
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge
            variant="outline"
            className="border-yellow-300 text-yellow-700"
          >
            Pending
          </Badge>
        )
      case "refunded":
        return (
          <Badge
            variant="outline"
            className="border-gray-300 text-gray-700"
          >
            Refunded
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.amount, 0)

  const pendingPayments = orders
    .filter((o) => o.paymentStatus === "pending")
    .reduce((sum, o) => sum + o.amount, 0)

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar navItems={adminNavItems} userType="admin" />

      <DashboardMobileNav
        navItems={adminNavItems}
        userType="admin"
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <div className="flex-1 flex flex-col lg:pl-64">
        <DashboardHeader
          title="Order Management"
          userType="admin"
          onMenuClick={() => setMobileNavOpen(true)}
        />

        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  KES {totalRevenue.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-600">
                  KES {pendingPayments.toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold">
                  {orders.filter((o) => o.status === "processing").length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>
                View and manage platform orders
              </CardDescription>
            </CardHeader>

            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by order ID, buyer, or supplier..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value)}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Buyer</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="w-[50px]" />
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6">
                          <span className="text-sm text-muted-foreground">
                            No orders match your filters.
                          </span>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.id}
                          </TableCell>
                          <TableCell>{order.buyer}</TableCell>
                          <TableCell>{order.supplier}</TableCell>
                          <TableCell className="font-semibold">
                            KES {order.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>
                            {getPaymentBadge(order.paymentStatus)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {order.date}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedOrder(order)
                                setDetailsOpen(true)
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Order Details Sheet */}
      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Order Details</SheetTitle>
            <SheetDescription>{selectedOrder?.id}</SheetDescription>
          </SheetHeader>

          {selectedOrder && (
            <div className="mt-6 space-y-6">
              {/* Order Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  {getStatusBadge(selectedOrder.status)}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment</span>
                  <div className="flex items-center gap-2">
                    {getPaymentBadge(selectedOrder.paymentStatus)}
                    <span className="text-sm">
                      via {selectedOrder.paymentMethod}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {selectedOrder.date}
                  </span>
                </div>
              </div>

              <hr />

              {/* Parties */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Buyer</p>
                  <p className="font-medium">{selectedOrder.buyer}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Supplier</p>
                  <p className="font-medium">{selectedOrder.supplier}</p>
                </div>
              </div>

              <hr />

              {/* Items */}
              <div>
                <p className="font-semibold mb-3">Order Items</p>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start p-3 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.qty}
                        </p>
                      </div>
                      <p className="font-semibold text-sm">
                        KES {(item.qty * item.price).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <hr />

              {/* Total */}
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>
                  KES {selectedOrder.amount.toLocaleString()}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Contact Buyer
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Contact Supplier
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
