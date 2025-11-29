"use client"

export const dynamic = 'force-dynamic'

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, AlertTriangle, Package, Edit } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const inventoryItemsData = [
  { id: "1", name: "Electric Hospital Bed - ICU Grade", stock: 12, threshold: 5, status: "ok" },
  { id: "2", name: "Patient Monitor - 6 Parameter", stock: 15, threshold: 10, status: "ok" },
  { id: "3", name: "Surgical Instrument Set - General Surgery", stock: 3, threshold: 5, status: "low" },
  { id: "4", name: "Wheelchair - Foldable Standard", stock: 25, threshold: 10, status: "ok" },
  { id: "5", name: "Examination Gloves - Nitrile Box 100", stock: 800, threshold: 200, status: "ok" },
  { id: "6", name: "Pulse Oximeter - Fingertip", stock: 0, threshold: 10, status: "out" },
  { id: "7", name: "Laboratory Centrifuge - 12 Place", stock: 2, threshold: 5, status: "low" },
  { id: "8", name: "N95 Respirator Masks - Box of 50", stock: 150, threshold: 50, status: "ok" },
]

export default function SupplierInventoryPage() {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])

  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [editingItem, setEditingItem] = useState<(typeof inventoryItemsData)[0] | null>(null)

  const filteredItems = inventoryItemsData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || item.status === filter
    return matchesSearch && matchesFilter
  })

  const lowStockCount = inventoryItemsData.filter((i) => i.status === "low").length
  const outOfStockCount = inventoryItemsData.filter((i) => i.status === "out").length

  if (!isClient) {
    return (
      <div className="flex min-h-screen">
        <DashboardSidebar type="supplier" />
        <div className="flex-1 lg:pl-64">
          <DashboardHeader type="supplier" userName="MedSupply Kenya" />
          <main className="p-4 lg:p-6">
            <Skeleton className="h-8 w-1/4 mb-1" />
            <Skeleton className="h-4 w-1/2 mb-6" />
            <div className="grid gap-4 sm:grid-cols-3 mb-6">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Skeleton className="h-10 w-full max-w-sm" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-28" />
              </div>
            </div>
            <Skeleton className="h-96" />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar type="supplier" />
      <div className="flex-1 lg:pl-64">
        <DashboardHeader type="supplier" userName="MedSupply Kenya" />

        <main className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
            <p className="text-muted-foreground mt-1">Track and update your product stock levels</p>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-3 mb-6">
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{inventoryItemsData.length}</p>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-chart-4/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{lowStockCount}</p>
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{outOfStockCount}</p>
                  <p className="text-sm text-muted-foreground">Out of Stock</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                All
              </Button>
              <Button variant={filter === "low" ? "default" : "outline"} size="sm" onClick={() => setFilter("low")}>
                Low Stock
              </Button>
              <Button variant={filter === "out" ? "default" : "outline"} size="sm" onClick={() => setFilter("out")}>
                Out of Stock
              </Button>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Current Stock</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Threshold</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b last:border-0">
                      <td className="px-4 py-3 font-medium">{item.name}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`font-semibold ${item.status === "out" ? "text-destructive" : item.status === "low" ? "text-chart-4" : ""}`}
                        >
                          {item.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{item.threshold}</td>
                      <td className="px-4 py-3">
                        {item.status === "ok" && (
                          <Badge variant="outline" className="bg-secondary/20 text-secondary border-secondary/30">
                            In Stock
                          </Badge>
                        )}
                        {item.status === "low" && (
                          <Badge variant="outline" className="bg-chart-4/20 text-chart-4 border-chart-4/30">
                            Low Stock
                          </Badge>
                        )}
                        {item.status === "out" && (
                          <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30">
                            Out of Stock
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setEditingItem(item)}>
                              <Edit className="h-4 w-4 mr-1" />
                              Update
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Update Stock</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <p className="font-medium">{item.name}</p>
                              <div className="space-y-2">
                                <Label htmlFor="stock">Current Stock</Label>
                                <Input id="stock" type="number" defaultValue={item.stock} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="threshold">Low Stock Threshold</Label>
                                <Input id="threshold" type="number" defaultValue={item.threshold} />
                              </div>
                              <Button className="w-full">Save Changes</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
