"use client"

import { use, useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/products/product-card"
import { getSupplierById, products } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Package, ShoppingBag, Clock, CheckCircle2, ArrowLeft, Mail, Phone, Calendar } from "lucide-react"
import Link from "next/link"

type SortOption = "newest" | "price-low" | "price-high" | "popular" | "rating"

export default function SupplierPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const supplier = getSupplierById(resolvedParams.id)
  const [sortBy, setSortBy] = useState<SortOption>("popular")

  const supplierProducts = useMemo(() => {
    if (!supplier) return []

    const result = products.filter((p) => p.supplier === supplier.name)

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case "newest":
      default:
        break
    }

    return result
  }, [supplier, sortBy])

  if (!supplier) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Supplier not found</h1>
            <Link href="/suppliers" className="mt-4 inline-block">
              <Button>Back to Suppliers</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative h-48 bg-gradient-to-r from-primary/10 to-accent/10">
          <img
            src={supplier.coverImage || "/placeholder.svg"}
            alt={supplier.name}
            className="h-full w-full object-cover opacity-50"
          />
        </div>

        <div className="container mx-auto px-4">
          <div className="relative -mt-16 mb-8">
            <div className="rounded-xl border border-border bg-card p-6">
              <Link
                href="/suppliers"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Suppliers
              </Link>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative shrink-0">
                  <img
                    src={supplier.logo || "/placeholder.svg"}
                    alt={supplier.name}
                    className="h-24 w-24 rounded-lg border-2 border-background bg-background object-cover"
                  />
                  {supplier.verificationStatus === "verified" && (
                    <CheckCircle2 className="absolute -right-2 -bottom-2 h-6 w-6 text-accent fill-accent" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold">{supplier.name}</h1>
                        {supplier.verificationStatus === "verified" && (
                          <Badge className="bg-accent text-accent-foreground">Verified</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {supplier.location}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-chart-4 text-chart-4" />
                        <span className="font-semibold">{supplier.rating}</span>
                        <span className="text-sm text-muted-foreground ml-1">rating</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Package className="h-4 w-4" />
                      <span>{supplier.productCount} Products</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <ShoppingBag className="h-4 w-4" />
                      <span>{supplier.totalOrders.toLocaleString()} Orders</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{supplier.responseTime} Response</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Est. {supplier.yearEstablished}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="products" className="mb-12">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {supplierProducts.length} product{supplierProducts.length !== 1 ? "s" : ""}
                </p>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {supplierProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About {supplier.name}</h3>
                    <p className="text-muted-foreground leading-relaxed">{supplier.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Product Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {supplier.categories.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-border bg-card p-4">
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-muted-foreground text-xs">Email</p>
                          <p className="font-medium">{supplier.contactEmail}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-muted-foreground text-xs">Phone</p>
                          <p className="font-medium">{supplier.contactPhone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-muted-foreground text-xs">Location</p>
                          <p className="font-medium">{supplier.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-4">
                    <h3 className="font-semibold mb-3">Business Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Established</span>
                        <span className="font-medium">{supplier.yearEstablished}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Response Time</span>
                        <span className="font-medium">{supplier.responseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Verification</span>
                        <Badge variant="secondary" className="h-5">
                          {supplier.verificationStatus}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
