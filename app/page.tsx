import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedProductsSection } from "@/components/landing/featured-products-section"
import { BenefitsSection } from "@/components/landing/benefits-section"
import { CategoriesSection } from "@/components/landing/categories-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { CTASection } from "@/components/landing/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <FeaturedProductsSection />
        <CategoriesSection />
        <BenefitsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
