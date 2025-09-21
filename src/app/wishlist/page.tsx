"use client"

import { useState } from "react"
import { Heart, Trash2, Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { AddToCartButton } from "@/components/add-to-cart-button"
import Link from "next/link"

// Mock wishlist data
const wishlistItems = [
  {
    id: 1,
    name: "Digital Blood Pressure Monitor",
    price: 299.99,
    originalPrice: 349.99,
    image: "/images/products/bp-monitor.png",
    category: "Monitoring Equipment",
    brand: "MedTech Pro",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    addedDate: "2024-01-10",
  },
  {
    id: 3,
    name: "Hospital Bed Electric Adjustable",
    price: 2499.99,
    originalPrice: 2899.99,
    image: "/electric-adjustable-hospital-bed-medical-furniture.jpg",
    category: "Hospital Furniture",
    brand: "ComfortCare",
    rating: 4.7,
    reviews: 45,
    inStock: true,
    addedDate: "2024-01-08",
  },
  {
    id: 7,
    name: "Microscope Laboratory",
    price: 899.99,
    originalPrice: 1099.99,
    image: "/laboratory-microscope-medical-research-equipment.jpg",
    category: "Laboratory Equipment",
    brand: "LabVision",
    rating: 4.7,
    reviews: 56,
    inStock: false,
    addedDate: "2024-01-05",
  },
]

export default function WishlistPage() {
  const [items, setItems] = useState(wishlistItems)

  const removeFromWishlist = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const shareWishlist = () => {
    // Implement share functionality
    navigator.clipboard.writeText(window.location.href)
    alert("Wishlist link copied to clipboard!")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Heart className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Save items you're interested in to your wishlist and come back to them later.
            </p>
            <Button size="lg" asChild>
              <Link href="/products">Browse Equipment</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">My Wishlist</h1>
              <p className="text-muted-foreground">{items.length} items saved for later</p>
            </div>
            <Button variant="outline" onClick={shareWishlist}>
              <Share2 className="w-4 h-4 mr-2" />
              Share Wishlist
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 bg-background/80 hover:bg-background text-red-500 hover:text-red-600"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    {!item.inStock && (
                      <Badge variant="destructive" className="absolute top-3 left-3">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {item.category}
                  </Badge>
                  <CardTitle className="text-lg mb-1 text-foreground line-clamp-2">{item.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-3">{item.brand}</p>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground ml-2">({item.reviews})</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl font-bold text-foreground">${item.price}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Added on {new Date(item.addedDate).toLocaleDateString()}
                  </p>
                </CardContent>

                <CardFooter className="p-4 pt-0 space-y-2">
                  <AddToCartButton
                    productId={item.id}
                    productName={item.name}
                    disabled={!item.inStock}
                    className="w-full"
                  />
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <Link href={`/products/${item.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Recommendations */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">You Might Also Like</h2>
            <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
              <p className="text-muted-foreground mb-4">
                Based on your wishlist, we'll show personalized recommendations here.
              </p>
              <Button variant="outline" asChild>
                <Link href="/products">Browse More Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
