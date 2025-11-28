import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { categories } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight">Browse by Category</h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the medical equipment and supplies you need across our comprehensive range of categories
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{category.count} products available</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <div className="mt-4">
                  <Badge variant="secondary" className="text-xs">
                    View All
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
