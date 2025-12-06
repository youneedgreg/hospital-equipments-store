"use client"

import { useState, useMemo, useEffect } from "react"
import { getProducts, Product } from "@/lib/supabase/queries"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/products/product-card"
import { ProductFilters } from "@/components/products/product-filters"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

type SortOption = "newest" | "price-low" | "price-high" | "popular" | "rating"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("popular")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000])
  const [inStockOnly, setInStockOnly] = useState(false)

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.categories?.name.toLowerCase().includes(query) ||
          p.suppliers?.business_name.toLowerCase().includes(query),
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category_id))
    }

    // Supplier filter
    if (selectedSuppliers.length > 0) {
      result = result.filter((p) => selectedSuppliers.includes(p.supplier_id || ''))
    }

    // Price filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.in_stock)
    }

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
  }, [searchQuery, sortBy, selectedCategories, selectedSuppliers, priceRange, inStockOnly, products])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Medical Equipment & Supplies</h1>
            <p className="mt-2 text-muted-foreground">
              Browse our comprehensive catalog of verified medical equipment and supplies
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medical equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <ProductFilters
                  selectedCategories={selectedCategories}
                  onCategoriesChange={setSelectedCategories}
                  selectedSuppliers={selectedSuppliers}
                  onSuppliersChange={setSelectedSuppliers}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  inStockOnly={inStockOnly}
                  onInStockChange={setInStockOnly}
                />
              </div>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[160px]">
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
          </div>

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <ProductFilters
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
              selectedSuppliers={selectedSuppliers}
              onSuppliersChange={setSelectedSuppliers}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              inStockOnly={inStockOnly}
              onInStockChange={setInStockOnly}
            />

            {/* Product Grid */}
            <div className="flex-1">
              {loading && (
                <div className="text-center py-16">
                  <p className="text-lg font-medium">Loading products...</p>
                </div>
              )}
              {error && (
                <div className="text-center py-16 text-red-500">
                  <p className="text-lg font-medium">Error: {error}</p>
                  <p className="text-muted-foreground mt-1">Please try again later.</p>
                </div>
              )}
              {!loading && !error && (
                <>
                  <p className="text-sm text-muted-foreground mb-4">
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                  </p>

                  {filteredProducts.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-lg font-medium">No products found</p>
                      <p className="text-muted-foreground mt-1">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
