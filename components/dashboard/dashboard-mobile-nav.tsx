"use client"

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
  Boxes,
  Users,
  CheckCircle,
  BarChart3,
} from "lucide-react"

interface DashboardMobileNavProps {
  type: "buyer" | "supplier" | "admin"
  onClose: () => void
}

const buyerLinks = [
  { href: "/dashboard/buyer", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/buyer/orders", label: "My Orders", icon: ShoppingBag },
  { href: "/dashboard/buyer/profile", label: "Profile & Settings", icon: User },
  { href: "/dashboard/buyer/support", label: "Support / Help", icon: HelpCircle },
]

const supplierLinks = [
  { href: "/dashboard/supplier", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/supplier/products", label: "My Products", icon: Package },
  { href: "/dashboard/supplier/orders", label: "Orders", icon: ShoppingBag },
  { href: "/dashboard/supplier/inventory", label: "Inventory", icon: Boxes },
  { href: "/dashboard/supplier/profile", label: "Profile & KYC", icon: User },
  { href: "/dashboard/supplier/support", label: "Support", icon: HelpCircle },
]

const adminLinks = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin/users", label: "Users", icon: Users },
  { href: "/dashboard/admin/suppliers", label: "Suppliers", icon: CheckCircle },
  { href: "/dashboard/admin/products", label: "Products", icon: Package },
  { href: "/dashboard/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/dashboard/admin/reports", label: "Reports", icon: BarChart3 },
]

export function DashboardMobileNav({ type, onClose }: DashboardMobileNavProps) {
  const pathname = usePathname()
  const links = type === "buyer" ? buyerLinks : type === "supplier" ? supplierLinks : adminLinks

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2" onClick={onClose}>
          <LogoIcon className="h-8 w-8" />
          <span className="font-bold text-sidebar-foreground">BIOSYTEMS</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
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
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Link>
      </div>
    </div>
  )
}
