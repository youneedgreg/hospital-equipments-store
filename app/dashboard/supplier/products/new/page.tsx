"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Upload, Loader2, X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const categoriesData = [
  "Hospital Beds",
  "PPE & Safety",
  "Diagnostic Tools",
  "Surgical Instruments",
  "Laboratory Equipment",
  "Consumables",
  "Mobility Aids",
  "Patient Monitoring",
]

export default function NewProductPage() {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push("/dashboard/supplier/products")
  }

  const addPlaceholderImage = () => {
    if (images.length < 5) {
      setImages([...images, `/placeholder.svg?key=${Math.random().toString(36).substring(7)}`])
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  if (!isClient) {
    return (
        <div className="flex min-h-screen">
      <DashboardSidebar type="supplier" navItems={[]} />
            <div className="flex-1 lg:pl-64">
                <DashboardHeader type="supplier" userName="MedSupply Kenya" />
                <main className="p-4 lg:p-6">
                    <Skeleton className="h-6 w-32 mb-6" />
                    <div className="mb-6">
                        <Skeleton className="h-8 w-1/3 mb-1" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className="max-w-3xl space-y-6">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-40 w-full" />
                        <Skeleton className="h-40 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                </main>
            </div>
        </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar type="supplier" navItems={[]} />
      <div className="flex-1 lg:pl-64">
        <DashboardHeader type="supplier" userName="MedSupply Kenya" />

        <main className="p-4 lg:p-6">
          <Link
            href="/dashboard/supplier/products"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>

          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
            <p className="text-muted-foreground mt-1">List a new product on the marketplace</p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-3xl">
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input id="name" placeholder="e.g., Electric Hospital Bed - ICU Grade" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesData.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase().replace(/ /g, "-")}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU (Optional)</Label>
                    <Input id="sku" placeholder="e.g., BED-ICU-001" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea id="description" placeholder="Describe your product in detail..." rows={4} required />
                  </div>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Pricing & Stock</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (KSh) *</Label>
                    <Input id="price" type="number" placeholder="0" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price (KSh)</Label>
                    <Input id="originalPrice" type="number" placeholder="0" />
                    <p className="text-xs text-muted-foreground">Set for sale items</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity *</Label>
                    <Input id="stock" type="number" placeholder="0" required />
                  </div>
                </div>
              </div>

              {/* Images */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Product Images</h2>
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 h-6 w-6 rounded-full bg-background/80 flex items-center justify-center hover:bg-background"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <button
                      type="button"
                      onClick={addPlaceholderImage}
                      className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center hover:border-primary/50 transition-colors"
                    >
                      <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">Upload</span>
                    </button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Upload up to 5 images. First image will be the main image.
                </p>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Specifications (Optional)</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input id="dimensions" placeholder="e.g., 220cm x 100cm x 60cm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input id="weight" placeholder="e.g., 50kg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="material">Material</Label>
                    <Input id="material" placeholder="e.g., Stainless Steel" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="warranty">Warranty</Label>
                    <Input id="warranty" placeholder="e.g., 2 Years" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Add Product
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
