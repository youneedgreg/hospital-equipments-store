"use client"

import React, { useState, useEffect } from "react"
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
import { useToast } from "@/components/ui/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { formatPrice } from "@/lib/data"

const adminNavItems = [
  { href: "/dashboard/admin", label: "Overview", icon: "BarChart3" },
  { href: "/dashboard/admin/users", label: "Users", icon: "Users" },
  { href: "/dashboard/admin/suppliers", label: "Suppliers", icon: "Building2" },
  { href: "/dashboard/admin/products", label: "Products", icon: "Package" },
  { href: "/dashboard/admin/orders", label: "Orders", icon: "ShoppingCart" },
  { href: "/dashboard/admin/verifications", label: "Verifications", icon: "ShieldCheck" },
  { href: "/dashboard/admin/reports", label: "Reports", icon: "BarChart3" },
]

type OrderStatus = "completed" | "processing" | "pending" | string

interface AdminStats {
  totalRevenue: number
  totalOrders: number
  activeSuppliers: number
  registeredBuyers: number
  pendingVerifications: number
}

interface RecentOrder {
  id: string
  created_at: string
  status: OrderStatus
  total_amount: number
  profiles: {
    full_name: string
  }
}

interface PendingVerification {
  id: string
  created_at: string
  status: string
  profiles: {
    full_name: string
  }
}

export default function AdminDashboardPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [pendingVerifications, setPendingVerifications] = useState<PendingVerification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsResponse, recentActivityResponse] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/recent-activity"),
        ])

        if (!statsResponse.ok) {
          const errorData = await statsResponse.json()
          throw new Error(errorData.error || "Failed to fetch admin stats")
        }

        if (!recentActivityResponse.ok) {
          const errorData = await recentActivityResponse.json()
          throw new Error(errorData.error || "Failed to fetch recent activity")
        }

        const statsData: AdminStats = await statsResponse.json()
        const recentActivityData = await recentActivityResponse.json()

        setStats(statsData)
        setRecentOrders(recentActivityData.recentOrders)
        setPendingVerifications(recentActivityData.pendingVerifications)
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        <p>Error: {error || "Failed to load dashboard stats."}</p>
      </div>
    )
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
              value={formatPrice(stats.totalRevenue)}
              icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="Total Orders"
              value={stats.totalOrders.toString()}
              icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="Active Suppliers"
              value={stats.activeSuppliers.toString()}
              icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
            />
            <StatsCard
              title="Registered Buyers"
              value={stats.registeredBuyers.toString()}
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
                  <p className="text-2xl font-bold text-yellow-900">{stats.pendingVerifications}</p>
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
                        <p className="text-xs text-muted-foreground">{order.profiles.full_name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">{formatPrice(order.total_amount)}</p>
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
                            {item.profiles.full_name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{item.profiles.full_name}</p>
                          <p className="text-xs text-muted-foreground">
                            Submitted {new Date(item.created_at).toLocaleDateString()}
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
        </main>
      </div>
    </div>
  )
}
