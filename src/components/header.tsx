"use client"

import { useState } from "react"
import { Search, ShoppingCart, User, Menu, Heart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

import { ModeToggle } from "./theme-toggle";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from your auth context

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">H+</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">MedEquip Pro</h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-foreground hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/account" className="text-foreground hover:text-primary transition-colors">
              Account
            </Link>
            <Link href="/orders" className="text-foreground hover:text-primary transition-colors">
              Orders
            </Link>
            <Link href="/wishlist" className="text-foreground hover:text-primary transition-colors">
              Wishlist
            </Link>
            <Link href="/support" className="text-foreground hover:text-primary transition-colors">
              Support
            </Link>
            <Link href="/admin" className="text-foreground hover:text-primary transition-colors">
              Admin
            </Link>
          </nav>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search medical equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    <User className="w-4 h-4 mr-2" />
                    Account
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account?tab=billing">Billing</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
                <Link href="/auth/login">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}

            <Button variant="ghost" size="sm" className="relative">
              <Heart className="w-4 h-4" />
              <Badge
                variant="secondary"
                className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
              >
                0
              </Badge>
            </Button>
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="w-4 h-4" />
                {cartItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
                  >
                    {cartItems}
                  </Badge>
                )}
              </Link>
            </Button>
            <ModeToggle />
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
