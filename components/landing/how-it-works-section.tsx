const steps = [
  {
    step: "01",
    title: "Create Account",
    description: "Sign up as a buyer or supplier. Complete your profile with organization details.",
  },
  {
    step: "02",
    title: "Browse & Compare",
    description: "Explore thousands of products from verified suppliers. Compare prices and specifications.",
  },
  {
    step: "03",
    title: "Pay via MPesa",
    description: "Secure checkout with MPesa STK push. Receive instant payment confirmation.",
  },
  {
    step: "04",
    title: "Receive Delivery",
    description: "Track your order in real-time. Get your supplies delivered to your doorstep.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting started with BIOSYTEMS is simple. Here's how to start sourcing medical supplies.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-12 hidden h-0.5 w-[calc(100%-200px)] -translate-x-1/2 bg-border lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
