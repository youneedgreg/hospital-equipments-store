"use client"

import { useState, useEffect, useRef } from "react"
import { products, Product } from "@/lib/data"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function FeaturedProductsSection() {
  const featuredProducts = products.slice(0, 8)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchQuery.length > 1) {
      const lowercasedQuery = searchQuery.toLowerCase()
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercasedQuery) ||
          product.description.toLowerCase().includes(lowercasedQuery) ||
          product.category.toLowerCase().includes(lowercasedQuery)
      )
      setFilteredProducts(results)
      setIsPopupOpen(true)
    } else {
      setFilteredProducts([])
      setIsPopupOpen(false)
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsPopupOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchContainerRef])

  return (
    <section className="py-12 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
            Your One-Stop Marketplace for Medical Supplies
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Find everything from advanced diagnostic equipment to everyday consumables. Connect with trusted suppliers and get the best deals.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-12 w-full max-w-3xl mx-auto" ref={searchContainerRef}>
          <div className="flex items-center flex-1 rounded-full border border-border bg-card px-4 py-2">
            <input
              aria-label="Search products"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Search for hospital beds, PPE, diagnostic tools, suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsPopupOpen(searchQuery.length > 1)}
            />
            <Button size="sm" className="ml-3">
              Search
            </Button>
          </div>
          {isPopupOpen && filteredProducts.length > 0 && (
            <div className="absolute top-full mt-2 w-full rounded-lg border bg-card shadow-lg z-10">
              <ul>
                {filteredProducts.slice(0, 5).map((product) => (
                  <li key={product.id}>
                    <Link href={`/products/${product.id}`} className="block hover:bg-muted">
                      <div className="flex items-center p-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                        <div className="ml-4">
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Featured Medical Equipment</h2>
          <Link href="/products">
            <Button variant="outline">View All Products</Button>
.
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
