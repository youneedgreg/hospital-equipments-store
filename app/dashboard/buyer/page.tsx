import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/data"
import { ShoppingBag, Package, Truck, CheckCircle, ArrowRight, ShoppingCart } from "lucide-react"

const recentOrders = [
  {
    id: "BIO-12345678",
    date: "Nov 20, 2025",
    items: 3,
    total: 125000,
    paymentStatus: "paid" as const,
    orderStatus: "shipped" as const,
  },
  {
    id: "BIO-12345677",
    date: "Nov 18, 2025",
    items: 5,
    total: 45000,
    paymentStatus: "paid" as const,
    orderStatus: "delivered" as const,
  },
  {
    id: "BIO-12345676",
    date: "Nov 15, 2025",
    items: 2,
    total: 285000,
    paymentStatus: "pending" as const,
    orderStatus: "pending" as const,
  },
  {
    id: "BIO-12345675",
    date: "Nov 10, 2025",
    items: 8,
    total: 32000,
    paymentStatus: "paid" as const,
    orderStatus: "delivered" as const,
  },
]

export default function BuyerDashboardPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar type="buyer" navItems={[]} />
      <div className="flex-1 lg:pl-64">
        <DashboardHeader type="buyer" userName="Dr. Sarah Wanjiku" />

        <main className="p-4 lg:p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, Dr. Sarah!</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your orders today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Total Orders"
              value="24"
              description="All time orders"
              icon={<ShoppingBag className="h-5 w-5" />}
            />
            <StatsCard
              title="In Progress"
              value="3"
              description="Being processed"
              icon={<Package className="h-5 w-5" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard title="In Transit" value="2" description="On the way" icon={<Truck className="h-5 w-5" />} />
            <StatsCard
              title="Delivered"
              value="19"
              description="Successfully received"
              icon={<CheckCircle className="h-5 w-5" />}
            />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/products">
              <Button>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Browse Products
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="outline">View Cart</Button>
            </Link>
          </div>

          {/* Recent Orders */}
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <Link
                href="/dashboard/buyer/orders"
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
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Items</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Total</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Payment</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="px-4 py-3">
                        <span className="font-medium">{order.id}</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{order.date}</td>
                      <td className="px-4 py-3 text-sm">{order.items} items</td>
                      <td className="px-4 py-3 font-medium">{formatPrice(order.total)}</td>
                      <td className="px-4 py-3">
                        <OrderStatusBadge status={order.paymentStatus} type="payment" />
                      </td>
                      <td className="px-4 py-3">
                        <OrderStatusBadge status={order.orderStatus} type="order" />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
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
