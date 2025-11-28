import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { supplierDetails } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Package, ShoppingBag, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SuppliersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Verified Suppliers</h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with trusted medical equipment suppliers across Kenya. All suppliers are verified and rated by
              healthcare professionals.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {supplierDetails.map((supplier) => (
              <div
                key={supplier.id}
                className="rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="relative h-32 bg-gradient-to-r from-primary/10 to-accent/10">
                  <img
                    src={supplier.coverImage || "/placeholder.svg"}
                    alt={supplier.name}
                    className="h-full w-full object-cover opacity-50"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={supplier.logo || "/placeholder.svg"}
                        alt={supplier.name}
                        className="h-16 w-16 rounded-lg border-2 border-background bg-background object-cover"
                      />
                      {supplier.verificationStatus === "verified" && (
                        <CheckCircle2 className="absolute -right-1 -bottom-1 h-5 w-5 text-accent fill-accent" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{supplier.name}</h3>
                          <div className="flex items-center gap-1 mt-1 text-muted-foreground text-sm">
                            <MapPin className="h-3.5 w-3.5" />
                            {supplier.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-chart-4/10 px-2 py-1 rounded">
                          <Star className="h-4 w-4 fill-chart-4 text-chart-4" />
                          <span className="font-semibold">{supplier.rating}</span>
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{supplier.description}</p>

                      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Package className="h-4 w-4" />
                          <span>{supplier.productCount} Products</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <ShoppingBag className="h-4 w-4" />
                          <span>{supplier.totalOrders.toLocaleString()} Orders</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{supplier.responseTime}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {supplier.categories.map((category) => (
                          <Badge key={category} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-4">
                        <Link href={`/suppliers/${supplier.id}`}>
                          <Button className="w-full">View Supplier</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
