import { StarIcon } from "@/components/icons"

const testimonials = [
  {
    quote:
      "BIOSYTEMS has transformed how we procure medical supplies. The verification process gives us confidence in our suppliers.",
    author: "Dr. Sarah Wanjiku",
    role: "Chief Medical Officer",
    organization: "Nairobi Regional Hospital",
    avatar: "/professional-woman-doctor-african.jpg",
  },
  {
    quote:
      "The MPesa integration makes payments seamless. We've reduced our procurement time by 60% since switching to BIOSYTEMS.",
    author: "James Ochieng",
    role: "Procurement Manager",
    organization: "HealthFirst Clinics",
    avatar: "/professional-man-african-business.jpg",
  },
  {
    quote:
      "As a supplier, BIOSYTEMS has opened new markets for us. The platform is easy to use and the support team is excellent.",
    author: "Grace Muthoni",
    role: "Director",
    organization: "MedSupply Kenya Ltd",
    avatar: "/professional-woman-african-business.jpg",
  },
]

const partners = ["Kenya Red Cross", "Ministry of Health", "WHO Kenya", "UNICEF", "Aga Khan Hospital"]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">Trusted by Healthcare Leaders</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            See what healthcare professionals across Kenya are saying about BIOSYTEMS.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-xl border border-border bg-card p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5" />
                ))}
              </div>
              <blockquote className="text-muted-foreground leading-relaxed mb-6">"{testimonial.quote}"</blockquote>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.organization}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">Trusted by leading healthcare organizations</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner) => (
              <span key={partner} className="text-lg font-semibold text-muted-foreground/60">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
