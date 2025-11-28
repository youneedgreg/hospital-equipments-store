"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardMobileNav } from "@/components/dashboard/dashboard-mobile-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Users,
  Package,
  ShoppingCart,
  Building2,
  ShieldCheck,
  BarChart3,
  Search,
  MoreHorizontal,
  Eye,
  Ban,
  Mail,
  Star,
  TrendingUp,
} from "lucide-react"

const adminNavItems = [
  { href: "/dashboard/admin", label: "Overview", icon: BarChart3 },
  { href: "/dashboard/admin/users", label: "Users", icon: Users },
  { href: "/dashboard/admin/suppliers", label: "Suppliers", icon: Building2 },
  { href: "/dashboard/admin/products", label: "Products", icon: Package },
  { href: "/dashboard/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/admin/verifications", label: "Verifications", icon: ShieldCheck },
  { href: "/dashboard/admin/reports", label: "Reports", icon: BarChart3 },
]

const suppliers = [
  {
    id: 1,
    name: "MediSupply Kenya",
    email: "info@medisupply.co.ke",
    phone: "+254 712 345 678",
    products: 156,
    orders: 234,
    revenue: 2450000,
    rating: 4.9,
    status: "verified",
    joinDate: "2023-06-15",
  },
  {
    id: 2,
    name: "LabEquip Africa",
    email: "sales@labequip.co.ke",
    phone: "+254 722 456 789",
    products: 89,
    orders: 156,
    revenue: 1890000,
    rating: 4.8,
    status: "verified",
    joinDate: "2023-07-20",
  },
  {
    id: 3,
    name: "PharmaCare Ltd",
    email: "contact@pharmacare.co.ke",
    phone: "+254 733 567 890",
    products: 234,
    orders: 312,
    revenue: 1560000,
    rating: 4.7,
    status: "verified",
    joinDate: "2023-08-10",
  },
  {
    id: 4,
    name: "Coast Medical Distributors",
    email: "info@coastmedical.co.ke",
    phone: "+254 744 678 901",
    products: 45,
    orders: 67,
    revenue: 890000,
    rating: 4.5,
    status: "pending",
    joinDate: "2024-01-05",
  },
  {
    id: 5,
    name: "Nairobi Health Supplies",
    email: "sales@nairobihealthsupplies.co.ke",
    phone: "+254 755 789 012",
    products: 0,
    orders: 0,
    revenue: 0,
    rating: 0,
    status: "suspended",
    joinDate: "2023-09-15",
  },
]

export default function AdminSuppliersPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || supplier.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pending</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Suspended</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const totalRevenue = suppliers.reduce((sum, s) => sum + s.revenue, 0)

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
        <DashboardHeader title="Supplier Management" userType="admin" onMenuClick={() => setMobileNavOpen(true)} />

        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Total Suppliers</p>
                <p className="text-2xl font-bold">{suppliers.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold text-green-600">
                  {suppliers.filter((s) => s.status === "verified").length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {suppliers.filter((s) => s.status === "pending").length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">KES {(totalRevenue / 1000000).toFixed(1)}M</p>
              </CardContent>
            </Card>
          </div>

          {/* Suppliers List */}
          <Card>
            <CardHeader>
              <CardTitle>All Suppliers</CardTitle>
              <CardDescription>Manage platform suppliers and their performance</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search suppliers..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Supplier Cards */}
              <div className="space-y-4">
                {filteredSuppliers.map((supplier) => (
                  <div key={supplier.id} className="p-4 border rounded-lg hover:border-primary/50 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {supplier.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{supplier.name}</h3>
                            {getStatusBadge(supplier.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{supplier.email}</p>
                          <p className="text-xs text-muted-foreground">Joined: {supplier.joinDate}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Products</p>
                          <p className="font-semibold">{supplier.products}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Orders</p>
                          <p className="font-semibold">{supplier.orders}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Revenue</p>
                          <p className="font-semibold flex items-center justify-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            KES {(supplier.revenue / 1000).toFixed(0)}K
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Rating</p>
                          <p className="font-semibold flex items-center justify-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            {supplier.rating || "N/A"}
                          </p>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" /> Send Email
                          </DropdownMenuItem>
                          {supplier.status === "verified" && (
                            <DropdownMenuItem className="text-red-600">
                              <Ban className="mr-2 h-4 w-4" /> Suspend
                            </DropdownMenuItem>
                          )}
                          {supplier.status === "suspended" && (
                            <DropdownMenuItem className="text-green-600">
                              <ShieldCheck className="mr-2 h-4 w-4" /> Reactivate
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
