import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { formatPrice } from "@/lib/data"
import { Product, getProducts, getProductById } from "@/lib/supabase/queries"
import { ProductCard } from "@/components/products/product-card"
import { Star, ShoppingCart, Minus, Plus, Truck, Shield, MessageCircle, ChevronLeft, Check } from "lucide-react"

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  if (typeof resolvedParams.id !== 'string') {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <p className="text-muted-foreground mt-2">Invalid product ID provided.</p>
            <Button className="mt-4">
              Browse Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  const product = await getProductById(resolvedParams.id)

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <p className="text-muted-foreground mt-2">The product you're looking for doesn't exist.</p>
            {/* The button below should be a client component or use a different approach */}
            <Button className="mt-4">
              Browse Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Related products logic (to be re-evaluated later if needed)
  // const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/products"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Products
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {!product.in_stock && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <Badge variant="secondary" className="text-lg py-2 px-4">
                    Out of Stock
                  </Badge>
                </div>
              )}
              {product.original_price && product.in_stock && (
                <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-sm py-1 px-3">
                  {Math.round((1 - product.price / product.original_price) * 100)}% Off
                </Badge>
              )}
            </div>

            {/* Product Details */}
            <div>
                          <Badge variant="outline" className="mb-3">
                              {product.categories?.name}
                          </Badge>              <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-chart-4 text-chart-4" : "text-muted"}`}
                    />
                  ))}
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.review_count} reviews)</span>
              </div>

              <div className="mt-4">
                <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
                {product.original_price && (
                  <p className="text-lg text-muted-foreground line-through">{formatPrice(product.original_price)}</p>
                )}
              </div>

              <p className="mt-4 text-muted-foreground leading-relaxed">{product.description}</p>

              <div className="mt-6 p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Sold by:</span>
                  <span className="text-sm">{product.suppliers?.business_name}</span>
                  <div className="flex items-center gap-1 ml-2">
                    <Star className="h-4 w-4 fill-chart-4 text-chart-4" />
                    <span className="text-sm">{product.suppliers?.rating}</span>
                  </div>
                </div>
                {product.in_stock && product.stock_count && (
                  <p className="text-sm text-secondary mt-1">{product.stock_count} units in stock</p>
                )}
              </div>



              {/* Features */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Truck className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="text-sm font-medium">Fast Delivery</p>
                    <p className="text-xs text-muted-foreground">Nationwide shipping</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Shield className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="text-sm font-medium">Quality Assured</p>
                    <p className="text-xs text-muted-foreground">Verified supplier</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <Tabs defaultValue="description" className="mt-12">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="supplier">Supplier Info</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.review_count})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="prose prose-gray max-w-none">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                {product.features && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              {product.specifications ? (
                <div className="rounded-lg border">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <div key={key} className={`flex py-3 px-4 ${index % 2 === 0 ? "bg-muted/30" : ""}`}>
                      <span className="w-1/3 font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No specifications available.</p>
              )}
            </TabsContent>

            <TabsContent value="supplier" className="mt-6">
              <div className="rounded-lg border p-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{product.suppliers?.business_name?.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{product.suppliers?.business_name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-chart-4 text-chart-4" />
                        <span className="font-medium">{product.suppliers?.rating}</span>
                      </div>
                      <span className="text-muted-foreground">• Verified Supplier</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">150+</p>
                    <p className="text-sm text-muted-foreground">Products</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">98%</p>
                    <p className="text-sm text-muted-foreground">On-time Delivery</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">3+</p>
                    <p className="text-sm text-muted-foreground">Years on BIOSYTEMS</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 w-full bg-transparent">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Supplier
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border-b pb-6 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted" />
                      <div>
                        <p className="font-medium">Healthcare Professional</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                className={`h-4 w-4 ${j < 4 + (i % 2) ? "fill-chart-4 text-chart-4" : "text-muted"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {i + 1} month{i > 0 ? "s" : ""} ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-muted-foreground">
                      Excellent quality product. Fast delivery and well-packaged. The supplier was very responsive to
                      our inquiries. Highly recommended for healthcare facilities.
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>


        </div>
      </main>
      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}
