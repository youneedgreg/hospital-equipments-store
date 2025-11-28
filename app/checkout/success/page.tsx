"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, ArrowRight } from "lucide-react"

export default function CheckoutSuccessPage() {
  const orderNumber = `BIO-${Date.now().toString().slice(-8)}`

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/20">
            <CheckCircle className="h-10 w-10 text-secondary" />
          </div>

          <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>
          <p className="mt-3 text-muted-foreground">
            Thank you for your order. We've sent a confirmation to your email address.
          </p>

          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Package className="h-5 w-5 text-primary" />
              <span className="font-medium">Order Number</span>
            </div>
            <p className="text-2xl font-bold text-primary">{orderNumber}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              You will receive an MPesa STK push to complete payment. Once confirmed, your order will be processed and
              shipped.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="font-medium mb-2">What happens next?</h3>
              <ol className="text-sm text-muted-foreground text-left space-y-2">
                <li className="flex gap-2">
                  <span className="font-medium text-foreground">1.</span>
                  Complete payment via MPesa
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-foreground">2.</span>
                  Order confirmation email sent
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-foreground">3.</span>
                  Supplier prepares your order
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-foreground">4.</span>
                  Delivery within 2-5 business days
                </li>
              </ol>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/dashboard/buyer">
              <Button className="w-full sm:w-auto">
                View Order Status
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
