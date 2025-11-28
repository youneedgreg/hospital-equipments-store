import { ShieldIcon, TruckIcon, CreditCardIcon, CheckCircleIcon } from "@/components/icons"

const benefits = [
  {
    icon: CheckCircleIcon,
    title: "Verified Suppliers",
    description: "Every supplier is thoroughly vetted with KRA PIN verification and quality certification checks.",
  },
  {
    icon: CreditCardIcon,
    title: "Secure MPesa Payments",
    description: "Pay safely with MPesa integration. Instant STK push for seamless transactions.",
  },
  {
    icon: TruckIcon,
    title: "Fast Delivery",
    description: "Reliable nationwide delivery with real-time tracking for all your orders.",
  },
  {
    icon: ShieldIcon,
    title: "Quality Equipment",
    description: "Access certified medical equipment meeting international healthcare standards.",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Why Choose BIOSYTEMS?</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We make medical supply procurement simple, secure, and reliable for healthcare facilities across Kenya.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/20"
            >
              <div className="mb-4">
                <benefit.icon className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
