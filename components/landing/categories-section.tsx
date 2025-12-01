import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { categories, categoryDetails } from "@/lib/data"

export function CategoriesSection() {
  const featuredCategories = categories.slice(0, 6);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Browse by Category</h2>
            <p className="mt-2 text-muted-foreground">Find the medical supplies you need — from single items to bulk orders.</p>
          </div>
          <Link href="/categories" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-primary/20 flex flex-col"
            >
              <div className="aspect-[3/2] overflow-hidden bg-muted relative">
                <Image 
                  src={categoryDetails[category.id]?.image || "/placeholder.svg"} 
                  alt={category.name} 
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105" 
                />
                <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">{category.count} items</span>
              </div>
              <div className="p-5 flex-1">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <span>{categoryDetails[category.id]?.icon}</span>
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{categoryDetails[category.id]?.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-primary group-hover:underline">Shop {category.name}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
