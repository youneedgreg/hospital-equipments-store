import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              Trusted by 500+ Healthcare Facilities
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Kenya's Premier Medical Equipment Marketplace
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Connect with verified suppliers to source quality medical equipment and supplies. Serving hospitals,
              clinics, pharmacies, NGOs, and individual buyers across Kenya.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Browse Products
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register/supplier">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  Become a Supplier
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background bg-muted"
                    style={{
                      backgroundImage: `url(/placeholder.svg?height=32&width=32&query=healthcare professional ${i})`,
                      backgroundSize: "cover",
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">2,000+</span> verified suppliers
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-2xl">
              <img
                src="/modern-hospital-equipment-medical-supplies-profess.jpg"
                alt="Medical equipment and supplies"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-card p-4 shadow-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20">
                  <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Quality Assured</p>
                  <p className="text-sm text-muted-foreground">All suppliers verified</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-6 top-1/4 rounded-xl bg-card p-4 shadow-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Secure Payments</p>
                  <p className="text-sm text-muted-foreground">MPesa integrated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
