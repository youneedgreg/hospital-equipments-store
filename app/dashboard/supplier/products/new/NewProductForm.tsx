
"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Loader2, X } from "lucide-react"

interface Category {
  id: string
  name: string
  description: string
  image_url: string
  created_at: string
}

interface Supplier {
    business_name: string
}

interface NewProductFormProps {
    categories: Category[]
    supplier: Supplier | null
}

export default function NewProductForm({ categories, supplier }: NewProductFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [originalPrice, setOriginalPrice] = useState("")
  const [stock, setStock] = useState("")
  const [dimensions, setDimensions] = useState("")
  const [weight, setWeight] = useState("")
  const [material, setMaterial] = useState("")
  const [warranty, setWarranty] = useState("")
  const [featuresInput, setFeaturesInput] = useState("") // New state for features

  const handleCategoryChange = (value: string) => {
    setCategory(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const featuresArray = featuresInput.split(',').map(feature => feature.trim()).filter(feature => feature.length > 0)

    const productData = {
      name,
      description,
      category_id: category,
      price: parseFloat(price),
      original_price: originalPrice ? parseFloat(originalPrice) : undefined,
      stock_count: parseInt(stock, 10),
      image_url: images.length > 0 ? images[0] : null,
      dimensions,
      weight,
      material,
      warranty,
      features: featuresArray, // Include features in productData
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error("Failed to create product")
      }

      router.push("/dashboard/supplier/products")
    } catch (error) {
      console.error(error)
      // Handle error state here, e.g., show a toast notification
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages: string[] = []
      for (let i = 0; i < files.length && images.length + newImages.length < 5; i++) {
        const file = files[i]
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages((prevImages) => [...prevImages, e.target!.result as string])
          }
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <>
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
                <Input
                  id="name"
                  placeholder="e.g., Electric Hospital Bed - ICU Grade"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select required onValueChange={handleCategoryChange} value={category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU (Optional)</Label>
                <Input
                  id="sku"
                  placeholder="e.g., BED-ICU-001"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product in detail..."
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Pricing & Stock</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price">Price (KSh) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price (KSh)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  placeholder="0"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Set for sale items</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity *</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
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
                  onClick={handleImageUploadClick}
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
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Specifications */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Specifications (Optional)</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensions</Label>
                <Input
                  id="dimensions"
                  placeholder="e.g., 220cm x 100cm x 60cm"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  placeholder="e.g., 50kg"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="material">Material</Label>
                <Input
                  id="material"
                  placeholder="e.g., Stainless Steel"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warranty">Warranty</Label>
                <Input
                  id="warranty"
                  placeholder="e.g., 2 Years"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Features (Optional)</h2>
            <div className="space-y-2">
              <Label htmlFor="features">Features</Label>
              <Textarea
                id="features"
                placeholder="e.g., Waterproof, Shockproof, Portable"
                rows={3}
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Separate features with commas</p>
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
    </>
  )
}
