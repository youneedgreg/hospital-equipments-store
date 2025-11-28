
"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardMobileNav } from "@/components/dashboard/dashboard-mobile-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import {
  Users,
  Package,
  ShoppingCart,
  Building2,
  ShieldCheck,
  BarChart3,
  Download,
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

const salesData = [
  { month: "Jan", sales: 1250000 },
  { month: "Feb", sales: 1550000 },
  { month: "Mar", sales: 1350000 },
  { month: "Apr", sales: 1850000 },
  { month: "May", sales: 1650000 },
  { month: "Jun", sales: 2050000 },
]

const categoryData = [
    { name: "Hospital Beds", value: 400, fill: "var(--color-beds)" },
    { name: "PPE & Safety", value: 300, fill: "var(--color-ppe)" },
    { name: "Diagnostic Tools", value: 300, fill: "var(--color-diagnostic)" },
    { name: "Surgical Instruments", value: 200, fill: "var(--color-surgical)" },
]
const chartConfig = {
    sales: {
      label: "Sales",
    },
    beds: {
      label: "Beds",
      color: "hsl(var(--chart-1))",
    },
    ppe: {
      label: "PPE",
      color: "hsl(var(--chart-2))",
    },
    diagnostic: {
      label: "Diagnostic",
      color: "hsl(var(--chart-3))",
    },
    surgical: {
        label: "Surgical",
        color: "hsl(var(--chart-4))",
    },
}

const recentReports = [
  {
    id: 1,
    name: "Q4 2024 Sales Report",
    date: "2025-01-05",
    type: "Sales",
    format: "PDF",
  },
  {
    id: 2,
    name: "December 2024 User Activity",
    date: "2025-01-02",
    type: "User Activity",
    format: "CSV",
  },
  {
    id: 3,
    name: "2024 Supplier Performance Review",
    date: "2024-12-28",
    type: "Suppliers",
    format: "PDF",
  },
    {
    id: 4,
    name: "Q4 2024 Inventory Report",
    date: "2025-01-04",
    type: "Inventory",
    format: "PDF",
    },
]

export default function AdminReportsPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

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
        <DashboardHeader title="Reports & Analytics" userType="admin" onMenuClick={() => setMobileNavOpen(true)} />

        <main className="flex-1 p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales</CardTitle>
                <CardDescription>Sales performance over the last 6 months.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={salesData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                    </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Breakdown of sales by product category.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                        <Pie data={categoryData} dataKey="value" nameKey="name" />
                        <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Download recent system-generated reports.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.format}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
