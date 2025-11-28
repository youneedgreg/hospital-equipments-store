"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardMobileNav } from "@/components/dashboard/dashboard-mobile-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  CheckCircle,
  Flag,
} from "lucide-react"
import Image from "next/image"

const adminNavItems = [
  { href: "/dashboard/admin", label: "Overview", icon: BarChart3 },
  { href: "/dashboard/admin/users", label: "Users", icon: Users },
  { href: "/dashboard/admin/suppliers", label: "Suppliers", icon: Building2 },
  { href: "/dashboard/admin/products", label: "Products", icon: Package },
  { href: "/dashboard/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/admin/verifications", label: "Verifications", icon: ShieldCheck },
]

const products = [
  {
    id: 1,
    name: "Digital Blood Pressure Monitor",
    supplier: "MediSupply Kenya",
    category: "Diagnostic Equipment",
    price: 8500,
    stock: 45,
    status: "active",
    image: "/blood-pressure-monitor.png",
    featured: true,
  },
  {
    id: 2,
    name: "Laboratory Centrifuge",
    supplier: "LabEquip Africa",
    category: "Lab Equipment",
    price: 35000,
    stock: 12,
    status: "active",
    image: "/laboratory-centrifuge.jpg",
    featured: false,
  },
  {
    id: 3,
    name: "Disposable Surgical Masks",
    supplier: "PharmaCare Ltd",
    category: "PPE & Safety",
    price: 850,
    stock: 500,
    status: "active",
    image: "/surgical-masks-box.jpg",
    featured: true,
  },
  {
    id: 4,
    name: "Patient Monitor",
    supplier: "MediSupply Kenya",
    category: "Monitoring Equipment",
    price: 85000,
    stock: 8,
    status: "flagged",
    image: "/patient-monitor-medical.jpg",
    featured: false,
  },
  {
    id: 5,
    name: "Ultrasound Gel",
    supplier: "Coast Medical",
    category: "Consumables",
    price: 1200,
    stock: 0,
    status: "inactive",
    image: "/ultrasound-gel-bottle.jpg",
    featured: false,
  },
]

export default function AdminProductsPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Inactive</Badge>
      case "flagged":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Flagged</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const categories = [...new Set(products.map((p) => p.category))]

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar navItems={adminNavItems} userType="admin" />
      <DashboardMobileNav
        navItems={adminNavItems}
        userType="admin"
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <DashboardHeader title="Product Management" userType="admin" onMenuClick={() => setMobileNavOpen(true)} />

        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter((p) => p.status === "active").length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Flagged</p>
                <p className="text-2xl font-bold text-red-600">
                  {products.filter((p) => p.status === "flagged").length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{products.filter((p) => p.stock === 0).length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Products</CardTitle>
              <CardDescription>Manage and moderate platform products</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products or suppliers..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{product.name}</p>
                              {product.featured && (
                                <Badge variant="outline" className="text-xs border-yellow-300 text-yellow-700">
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{product.supplier}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{product.category}</TableCell>
                        <TableCell className="font-semibold">KES {product.price.toLocaleString()}</TableCell>
                        <TableCell>
                          <span
                            className={
                              product.stock === 0 ? "text-red-600" : product.stock < 10 ? "text-yellow-600" : ""
                            }
                          >
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell>{getStatusBadge(product.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              {product.status === "active" && (
                                <>
                                  <DropdownMenuItem className="text-yellow-600">
                                    <Flag className="mr-2 h-4 w-4" /> Flag Product
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Ban className="mr-2 h-4 w-4" /> Deactivate
                                  </DropdownMenuItem>
                                </>
                              )}
                              {product.status === "flagged" && (
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle className="mr-2 h-4 w-4" /> Approve
                                </DropdownMenuItem>
                              )}
                              {product.status === "inactive" && (
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle className="mr-2 h-4 w-4" /> Activate
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
