"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatPrice } from "@/lib/data"
import { Search, Plus, Edit, MoreHorizontal, Eye, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const supplierProducts = [
  {
    id: "1",
    name: "Electric Hospital Bed - ICU Grade",
    category: "Hospital Beds",
    price: 285000,
    stock: 12,
    status: "active",
    image: "/placeholder.svg?key=2j2ml",
  },
  {
    id: "2",
    name: "Patient Monitor - 6 Parameter",
    category: "Patient Monitoring",
    price: 165000,
    stock: 15,
    status: "active",
    image: "/placeholder.svg?key=9yk99",
  },
  {
    id: "3",
    name: "Surgical Instrument Set - General Surgery",
    category: "Surgical Instruments",
    price: 125000,
    stock: 3,
    status: "active",
    image: "/placeholder.svg?key=35fwp",
  },
  {
    id: "4",
    name: "Wheelchair - Foldable Standard",
    category: "Mobility Aids",
    price: 28000,
    stock: 25,
    status: "active",
    image: "/placeholder.svg?key=gu1vl",
  },
  {
    id: "5",
    name: "Examination Gloves - Nitrile Box 100",
    category: "PPE & Safety",
    price: 1800,
    stock: 800,
    status: "active",
    image: "/placeholder.svg?key=dsjfm",
  },
  {
    id: "6",
    name: "Pulse Oximeter - Fingertip",
    category: "Diagnostic Tools",
    price: 3500,
    stock: 0,
    status: "inactive",
    image: "/placeholder.svg?key=qzwji",
  },
]

export default function SupplierProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProducts = supplierProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar type="supplier" />
      <div className="flex-1 lg:pl-64">
        <DashboardHeader type="supplier" userName="MedSupply Kenya" />

        <main className="p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">My Products</h1>
              <p className="text-muted-foreground mt-1">Manage your product listings</p>
            </div>
            <Link href="/dashboard/supplier/products/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid/Table */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Stock</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b last:border-0">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="font-medium line-clamp-1">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{product.category}</td>
                      <td className="px-4 py-3 font-medium">{formatPrice(product.price)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={
                            product.stock === 0
                              ? "text-destructive font-medium"
                              : product.stock < 10
                                ? "text-chart-4 font-medium"
                                : ""
                          }
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={product.status === "active" ? "default" : "secondary"}>
                          {product.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No products found</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
