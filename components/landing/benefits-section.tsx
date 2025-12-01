import { ShieldIcon, TruckIcon, CreditCardIcon, CheckCircleIcon, ToolIcon, UserCheckIcon } from "@/components/icons"

const benefits = [
  {
    icon: CheckCircleIcon,
    title: "Verified Suppliers",
    description: "Every supplier is vetted with KRA PIN and quality certification checks.",
  },
  {
    icon: CreditCardIcon,
    title: "Secure MPesa Payments",
    description: "Instant STK push with secure checkout and buyer protection.",
  },
  {
    icon: TruckIcon,
    title: "Fast Nationwide Delivery",
    description: "Reliable delivery with tracking across Kenya — doorstep or facility delivery available.",
  },
  {
    icon: ShieldIcon,
    title: "After-Sales Services",
    description: "Free installation, staff training, commissioning and warranty support for eligible equipment.",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl text-balance">Why BIOSYTEMS Marketplace?</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Marketplace features built for healthcare procurement — transparent listings, secure payments, and end-to-end services.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <div key={i} className="group rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/20">
              <div className="mb-4">
                <b.icon className="h-12 w-12" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>

        {/* Services row (explicitly listing the after-sales services you requested) */}
        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <h4 className="font-semibold mb-3">Included marketplace services</h4>
          <div className="flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <ToolIcon className="h-6 w-6" />
              <div>
                <p className="font-medium">Free Installation</p>
                <p className="text-sm text-muted-foreground">Professional setup on eligible equipment purchases.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <TruckIcon className="h-6 w-6" />
              <div>
                <p className="font-medium">Delivery</p>
                <p className="text-sm text-muted-foreground">Nationwide delivery with tracking and scheduled slots.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <UserCheckIcon className="h-6 w-6" />
              <div>
                <p className="font-medium">Staff Training</p>
                <p className="text-sm text-muted-foreground">On-site training for your clinical and technical staff.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldIcon className="h-6 w-6" />
              <div>
                <p className="font-medium">Commissioning & Warranty</p>
                <p className="text-sm text-muted-foreground">Commissioning, testing, and warranty activation included where applicable.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
