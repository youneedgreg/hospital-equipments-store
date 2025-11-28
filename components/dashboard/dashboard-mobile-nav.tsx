"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogoIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import {
  LogOut,
} from "lucide-react"

interface SidebarLink {
  href: string
  label: string
  icon: React.ElementType
}

interface DashboardMobileNavProps {
  userType: "buyer" | "supplier" | "admin"
  navItems: SidebarLink[]
  onClose: () => void
  isOpen: boolean
}

export function DashboardMobileNav({ userType, navItems, onClose, isOpen }: DashboardMobileNavProps) {
  const pathname = usePathname()

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 lg:hidden" onClick={onClose}>
      <div className="fixed inset-y-0 right-0 z-50 w-64 bg-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center gap-2 px-6 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2" onClick={onClose}>
              <LogoIcon className="h-8 w-8" />
              <span className="font-bold text-sidebar-foreground">BIOSYTEMS</span>
            </Link>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((link) => {
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
      </div>
    </div>
  )
}
