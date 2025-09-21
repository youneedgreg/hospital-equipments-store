"use client"

import { useState } from "react"
import { Heart, Star, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { AddToCartButton } from "@/components/add-to-cart-button"
import Link from "next/link"

// Mock data for hospital equipment
const featuredProducts = [
  {
    id: 1,
    name: "Digital Blood Pressure Monitor",
    price: 299.99,
    originalPrice: 349.99,
    image: "/images/products/bp-monitor.png",
    category: "Monitoring Equipment",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Surgical Stethoscope Premium",
    price: 189.99,
    originalPrice: 229.99,
    image: "/premium-surgical-stethoscope-medical-instrument.jpg",
    category: "Diagnostic Tools",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: "Hospital Bed Electric Adjustable",
    price: 2499.99,
    originalPrice: 2899.99,
    image: "/electric-adjustable-hospital-bed-medical-furniture.jpg",
    category: "Furniture",
    rating: 4.7,
    reviews: 45,
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    name: "Pulse Oximeter Professional",
    price: 79.99,
    originalPrice: 99.99,
    image: "/professional-pulse-oximeter-medical-monitoring-dev.jpg",
    category: "Monitoring Equipment",
    rating: 4.6,
    reviews: 203,
    inStock: true,
    featured: true,
  },
]

const categories = [
  { name: "Monitoring Equipment", count: 156, icon: "📊" },
  { name: "Diagnostic Tools", count: 89, icon: "🔬" },
  { name: "Surgical Instruments", count: 234, icon: "⚕️" },
  { name: "Hospital Furniture", count: 67, icon: "🛏️" },
  { name: "Emergency Equipment", count: 45, icon: "🚨" },
  { name: "Laboratory Equipment", count: 123, icon: "🧪" },
]

export default function HomePage() {
  const [cartItems, setCartItems] = useState(0)

  const addToCart = (productId: number) => {
    setCartItems((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Professional Medical Equipment for Healthcare Excellence
            </h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Discover our comprehensive range of hospital-grade equipment, diagnostic tools, and medical supplies
              trusted by healthcare professionals worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8" asChild>
                <Link href="/products">Browse Equipment</Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Shop by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
                  <h4 className="font-semibold text-sm mb-2 text-foreground">{category.name}</h4>
                  <p className="text-xs text-muted-foreground">{category.count} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold text-foreground">Featured Equipment</h3>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-border/50">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.featured && <Badge className="absolute top-3 left-3 bg-primary">Featured</Badge>}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {product.category}
                  </Badge>
                  <CardTitle className="text-lg mb-2 text-foreground line-clamp-2">{product.name}</CardTitle>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl font-bold text-foreground">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <AddToCartButton
                    productId={product.id}
                    productName={product.name}
                    disabled={!product.inStock}
                    className="w-full"
                  />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🏥</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground">Hospital Grade Quality</h4>
              <p className="text-muted-foreground">All equipment meets strict medical standards and certifications</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🚚</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground">Fast Delivery</h4>
              <p className="text-muted-foreground">Express shipping available for urgent medical needs</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="text-xl font-semibold text-foreground">Warranty & Support</h4>
              <p className="text-muted-foreground">Comprehensive warranty and 24/7 technical support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">H+</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">MedEquip Pro</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Your trusted partner for professional medical equipment and healthcare solutions.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Monitoring Equipment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Diagnostic Tools
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Surgical Instruments
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Hospital Furniture
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Technical Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Warranty
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Returns
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 MedEquip Pro. All rights reserved. Professional medical equipment solutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
