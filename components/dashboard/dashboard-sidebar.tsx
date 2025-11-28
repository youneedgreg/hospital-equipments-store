"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogoIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingBag,
  User,
  HelpCircle,
  LogOut,
  Package,
  BarChart3,
  Users,
  CheckCircle,
  Boxes,
} from "lucide-react"

interface SidebarLink {
  href: string
  label: string
  icon: React.ElementType
}

interface DashboardSidebarProps {
  type: "buyer" | "supplier" | "admin"
}

const buyerLinks: SidebarLink[] = [
  { href: "/dashboard/buyer", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/buyer/orders", label: "My Orders", icon: ShoppingBag },
  { href: "/dashboard/buyer/profile", label: "Profile & Settings", icon: User },
  { href: "/dashboard/buyer/support", label: "Support / Help", icon: HelpCircle },
]

const supplierLinks: SidebarLink[] = [
  { href: "/dashboard/supplier", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/supplier/products", label: "My Products", icon: Package },
  { href: "/dashboard/supplier/orders", label: "Orders", icon: ShoppingBag },
  { href: "/dashboard/supplier/inventory", label: "Inventory", icon: Boxes },
  { href: "/dashboard/supplier/profile", label: "Profile & KYC", icon: User },
  { href: "/dashboard/supplier/support", label: "Support", icon: HelpCircle },
]

const adminLinks: SidebarLink[] = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin/users", label: "Users", icon: Users },
  { href: "/dashboard/admin/suppliers", label: "Suppliers", icon: CheckCircle },
  { href: "/dashboard/admin/products", label: "Products", icon: Package },
  { href: "/dashboard/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/dashboard/admin/reports", label: "Reports", icon: BarChart3 },
]

export function DashboardSidebar({ type }: DashboardSidebarProps) {
  const pathname = usePathname()

  const links = type === "buyer" ? buyerLinks : type === "supplier" ? supplierLinks : adminLinks
  const dashboardTitle = type === "buyer" ? "Buyer Portal" : type === "supplier" ? "Supplier Portal" : "Admin Panel"

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon className="h-8 w-8" />
          <span className="font-bold text-sidebar-foreground">BIOSYTEMS</span>
        </Link>
      </div>

      <div className="px-4 py-2">
        <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider px-2">{dashboardTitle}</p>
      </div>

      <nav className="flex-1 px-3 pb-4 space-y-1">
        {links.map((link) => {
          const isActive =
            pathname === link.href || (link.href !== `/dashboard/${type}` && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Link
          href="/products"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        >
          <Package className="h-5 w-5" />
          Browse Products
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Link>
      </div>
    </aside>
  )
}
