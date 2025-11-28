"use client"

import React, { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardMobileNav } from "@/components/dashboard/dashboard-mobile-nav"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Building2,
  ShieldCheck,
  XCircle,
} from "lucide-react"
import Link from "next/link"

const adminNavItems = [
  { href: "/dashboard/admin", label: "Overview", icon: <BarChart3 className="h-4 w-4" /> },
  { href: "/dashboard/admin/users", label: "Users", icon: <Users className="h-4 w-4" /> },
  { href: "/dashboard/admin/suppliers", label: "Suppliers", icon: <Building2 className="h-4 w-4" /> },
  { href: "/dashboard/admin/products", label: "Products", icon: <Package className="h-4 w-4" /> },
  { href: "/dashboard/admin/orders", label: "Orders", icon: <ShoppingCart className="h-4 w-4" /> },
  { href: "/dashboard/admin/verifications", label: "Verifications", icon: <ShieldCheck className="h-4 w-4" /> },
]

type OrderStatus = "completed" | "processing" | "pending" | string

const recentOrders = [
  {
    id: "ORD-2024-001",
    buyer: "Nairobi Hospital",
    amount: 125000,
    status: "completed" as OrderStatus,
    date: "2024-01-15",
  },
  {
    id: "ORD-2024-002",
    buyer: "Kenyatta National",
    amount: 89500,
    status: "processing" as OrderStatus,
    date: "2024-01-15",
  },
  {
    id: "ORD-2024-003",
    buyer: "Mombasa Clinic",
    amount: 45000,
    status: "pending" as OrderStatus,
    date: "2024-01-14",
  },
  {
    id: "ORD-2024-004",
    buyer: "Eldoret Medical",
    amount: 156000,
    status: "completed" as OrderStatus,
    date: "2024-01-14",
  },
]

const pendingVerifications = [
  { id: 1, name: "MedEquip Kenya Ltd", type: "supplier", submitted: "2024-01-14", documents: 5 },
  { id: 2, name: "Kisumu Health Supplies", type: "supplier", submitted: "2024-01-13", documents: 4 },
  { id: 3, name: "Coast Medical Distributors", type: "supplier", submitted: "2024-01-12", documents: 6 },
]

const topSuppliers = [
  { name: "MediSupply Kenya", sales: 2450000, orders: 156, rating: 4.9 },
  { name: "LabEquip Africa", sales: 1890000, orders: 98, rating: 4.8 },
  { name: "PharmaCare Ltd", sales: 1560000, orders: 234, rating: 4.7 },
]

export default function AdminDashboardPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Processing</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

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
        <DashboardHeader title="Admin Dashboard" userType="admin" onMenuClick={() => setMobileNavOpen(true)} />

        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Revenue"
              value="KES 12.5M"
              change="+18.2%"
              changeType="positive"
              icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="Total Orders"
              value="1,245"
              change="+12.5%"
              changeType="positive"
              icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="Active Suppliers"
              value="89"
              change="+5"
              changeType="positive"
              icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="Registered Buyers"
              value="456"
              change="+23"
              changeType="positive"
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          {/* Alerts Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-yellow-800 font-medium">Pending Verifications</p>
                  <p className="text-2xl font-bold text-yellow-900">12</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto border-yellow-300 text-yellow-700 bg-transparent"
                  asChild
                >
                  <Link href="/dashboard/admin/verifications">Review</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-red-800 font-medium">Reported Issues</p>
                  <p className="text-2xl font-bold text-red-900">5</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto border-red-300 text-red-700 bg-transparent"
                  asChild
                >
                  <Link href="/dashboard/admin/support">View</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-800 font-medium">This Month Growth</p>
                  <p className="text-2xl font-bold text-green-900">+24%</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto border-green-300 text-green-700 bg-transparent"
                  asChild
                >
                  <Link href="/dashboard/admin/analytics">Details</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Latest platform transactions</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/admin/orders">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.buyer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">KES {order.amount.toLocaleString()}</p>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Verifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Pending Verifications</CardTitle>
                  <CardDescription>Suppliers awaiting approval</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/admin/verifications">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingVerifications.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {item.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.documents} documents · Submitted {item.submitted}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </Button>
                        <Button size="sm" className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Suppliers */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Suppliers</CardTitle>
              <CardDescription>Highest revenue generators this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topSuppliers.map((supplier, index) => (
                  <div key={supplier.name} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-amber-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{supplier.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span className="text-yellow-500">★</span>
                          {supplier.rating}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Revenue</p>
                        <p className="font-semibold">KES {(supplier.sales / 1_000_000).toFixed(1)}M</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Orders</p>
                        <p className="font-semibold">{supplier.orders}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
