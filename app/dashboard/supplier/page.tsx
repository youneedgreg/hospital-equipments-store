import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/data"
import { DollarSign, ShoppingBag, Package, AlertTriangle, ArrowRight, Plus } from "lucide-react"

const recentOrders = [
  {
    id: "BIO-12345678",
    buyer: "Nairobi Regional Hospital",
    product: "Electric Hospital Bed - ICU Grade",
    quantity: 2,
    total: 570000,
    date: "Nov 20, 2025",
    status: "pending" as const,
  },
  {
    id: "BIO-12345677",
    buyer: "HealthFirst Clinics",
    product: "N95 Respirator Masks - Box of 50",
    quantity: 20,
    total: 90000,
    date: "Nov 19, 2025",
    status: "confirmed" as const,
  },
  {
    id: "BIO-12345676",
    buyer: "Mombasa Medical Center",
    product: "Patient Monitor - 6 Parameter",
    quantity: 3,
    total: 495000,
    date: "Nov 18, 2025",
    status: "shipped" as const,
  },
  {
    id: "BIO-12345675",
    buyer: "Kenya Red Cross",
    product: "Wheelchair - Foldable Standard",
    quantity: 10,
    total: 280000,
    date: "Nov 17, 2025",
    status: "delivered" as const,
  },
]

const lowStockProducts = [
  { name: "Surgical Instrument Set", stock: 3, threshold: 5 },
  { name: "Laboratory Centrifuge", stock: 2, threshold: 5 },
  { name: "Pulse Oximeter", stock: 0, threshold: 10 },
]

export default function SupplierDashboardPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar type="supplier" navItems={[]} />
      <div className="flex-1 lg:pl-64">
        <DashboardHeader type="supplier" userName="MedSupply Kenya" />

        <main className="p-4 lg:p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Supplier Dashboard</h1>
            <p className="text-muted-foreground mt-1">Overview of your sales and inventory</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Total Sales"
              value={formatPrice(2450000)}
              description="This month"
              icon={<DollarSign className="h-5 w-5" />}
              trend={{ value: 15, isPositive: true }}
            />
            <StatsCard
              title="Pending Orders"
              value="8"
              description="Awaiting confirmation"
              icon={<ShoppingBag className="h-5 w-5" />}
            />
            <StatsCard
              title="Active Products"
              value="47"
              description="Listed on marketplace"
              icon={<Package className="h-5 w-5" />}
            />
            <StatsCard
              title="Low Stock Alerts"
              value="3"
              description="Need restocking"
              icon={<AlertTriangle className="h-5 w-5" />}
            />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/dashboard/supplier/products/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </Link>
            <Link href="/dashboard/supplier/orders">
              <Button variant="outline">Manage Orders</Button>
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Orders */}
            <div className="lg:col-span-2 rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <Link
                  href="/dashboard/supplier/orders"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Buyer</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Total</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0">
                        <td className="px-4 py-3">
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm">{order.buyer}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.product} × {order.quantity}
                          </p>
                        </td>
                        <td className="px-4 py-3 font-medium">{formatPrice(order.total)}</td>
                        <td className="px-4 py-3">
                          <OrderStatusBadge status={order.status} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm">
                            Manage
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Low Stock Alerts</h2>
                <Link href="/dashboard/supplier/inventory" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="p-4 space-y-4">
                {lowStockProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-destructive/10">
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Threshold: {product.threshold} units</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${product.stock === 0 ? "text-destructive" : "text-chart-4"}`}>
                        {product.stock}
                      </p>
                      <p className="text-xs text-muted-foreground">in stock</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  Update Inventory
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
