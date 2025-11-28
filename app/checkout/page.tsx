"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/data"
import { Check, ChevronLeft, CreditCard, Loader2, Smartphone, Building2 } from "lucide-react"

type CheckoutStep = "address" | "payment" | "review"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("address")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("mpesa")

  const [addressData, setAddressData] = useState({
    fullName: "",
    phone: "",
    email: "",
    organization: "",
    address: "",
    city: "",
    county: "",
    notes: "",
  })

  const VAT_RATE = 0.16
  const vat = subtotal * VAT_RATE
  const deliveryEstimate = subtotal > 50000 ? 0 : 2500
  const total = subtotal + vat + deliveryEstimate

  const steps = [
    { id: "address", label: "Delivery Address" },
    { id: "payment", label: "Payment Method" },
    { id: "review", label: "Review & Confirm" },
  ]

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep("review")
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    clearCart()
    router.push("/checkout/success")
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back Link */}
          <Link
            href="/cart"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>

          <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

          {/* Steps Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                        currentStep === step.id
                          ? "bg-primary text-primary-foreground"
                          : steps.findIndex((s) => s.id === currentStep) > index
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {steps.findIndex((s) => s.id === currentStep) > index ? <Check className="h-5 w-5" /> : index + 1}
                    </div>
                    <span className="ml-2 text-sm font-medium hidden sm:block">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && <div className="w-12 sm:w-24 h-0.5 mx-2 sm:mx-4 bg-border" />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Address Step */}
              {currentStep === "address" && (
                <form onSubmit={handleAddressSubmit} className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-xl font-semibold mb-6">Delivery Address</h2>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={addressData.fullName}
                        onChange={(e) => setAddressData({ ...addressData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+254"
                        value={addressData.phone}
                        onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={addressData.email}
                        onChange={(e) => setAddressData({ ...addressData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization (Optional)</Label>
                      <Input
                        id="organization"
                        placeholder="Hospital / Clinic name"
                        value={addressData.organization}
                        onChange={(e) => setAddressData({ ...addressData, organization: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        placeholder="Building, Street, Area"
                        value={addressData.address}
                        onChange={(e) => setAddressData({ ...addressData, address: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={addressData.city}
                        onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="county">County *</Label>
                      <Input
                        id="county"
                        value={addressData.county}
                        onChange={(e) => setAddressData({ ...addressData, county: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any special delivery instructions..."
                        rows={2}
                        value={addressData.notes}
                        onChange={(e) => setAddressData({ ...addressData, notes: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="mt-6">
                    Continue to Payment
                  </Button>
                </form>
              )}

              {/* Payment Step */}
              {currentStep === "payment" && (
                <form onSubmit={handlePaymentSubmit} className="rounded-xl border border-border bg-card p-6">
                  <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <label
                      htmlFor="mpesa"
                      className={`flex items-start gap-4 rounded-lg border p-4 cursor-pointer transition-colors ${
                        paymentMethod === "mpesa"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value="mpesa" id="mpesa" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-5 w-5 text-secondary" />
                          <span className="font-medium">MPesa</span>
                          <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded">
                            Recommended
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pay securely via MPesa STK Push. You'll receive a prompt on your phone to confirm the payment.
                        </p>
                        {paymentMethod === "mpesa" && (
                          <div className="mt-4 p-3 rounded-lg bg-muted/50">
                            <Label htmlFor="mpesa-phone" className="text-sm">
                              MPesa Phone Number
                            </Label>
                            <Input
                              id="mpesa-phone"
                              placeholder="+254 7XX XXX XXX"
                              className="mt-1"
                              defaultValue={addressData.phone}
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              An STK push will be sent to this number when you place the order.
                            </p>
                          </div>
                        )}
                      </div>
                    </label>

                    <label
                      htmlFor="bank"
                      className={`flex items-start gap-4 rounded-lg border p-4 cursor-pointer transition-colors ${
                        paymentMethod === "bank"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value="bank" id="bank" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-primary" />
                          <span className="font-medium">Bank Transfer</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Transfer directly to our bank account. Order will be processed upon payment confirmation.
                        </p>
                        {paymentMethod === "bank" && (
                          <div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm">
                            <p>
                              <span className="font-medium">Bank:</span> Equity Bank Kenya
                            </p>
                            <p>
                              <span className="font-medium">Account:</span> 0123456789012
                            </p>
                            <p>
                              <span className="font-medium">Name:</span> BIOSYTEMS Ltd
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Include your order number as the reference.
                            </p>
                          </div>
                        )}
                      </div>
                    </label>

                    <label
                      htmlFor="card"
                      className={`flex items-start gap-4 rounded-lg border p-4 cursor-pointer transition-colors ${
                        paymentMethod === "card"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value="card" id="card" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <span className="font-medium">Credit/Debit Card</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pay with Visa, Mastercard, or other major cards.
                        </p>
                      </div>
                    </label>
                  </RadioGroup>

                  <div className="flex gap-3 mt-6">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep("address")}>
                      Back
                    </Button>
                    <Button type="submit">Review Order</Button>
                  </div>
                </form>
              )}

              {/* Review Step */}
              {currentStep === "review" && (
                <div className="space-y-6">
                  {/* Delivery Details */}
                  <div className="rounded-xl border border-border bg-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Delivery Details</h2>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep("address")}>
                        Edit
                      </Button>
                    </div>
                    <div className="text-sm space-y-1">
                      <p className="font-medium">{addressData.fullName}</p>
                      {addressData.organization && <p>{addressData.organization}</p>}
                      <p className="text-muted-foreground">{addressData.address}</p>
                      <p className="text-muted-foreground">
                        {addressData.city}, {addressData.county}
                      </p>
                      <p className="text-muted-foreground">{addressData.phone}</p>
                      <p className="text-muted-foreground">{addressData.email}</p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="rounded-xl border border-border bg-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Payment Method</h2>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep("payment")}>
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      {paymentMethod === "mpesa" && <Smartphone className="h-5 w-5 text-secondary" />}
                      {paymentMethod === "bank" && <Building2 className="h-5 w-5 text-primary" />}
                      {paymentMethod === "card" && <CreditCard className="h-5 w-5 text-primary" />}
                      <span className="font-medium capitalize">
                        {paymentMethod === "mpesa"
                          ? "MPesa"
                          : paymentMethod === "bank"
                            ? "Bank Transfer"
                            : "Credit/Debit Card"}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                    <div className="divide-y">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                            <img
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium line-clamp-1">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setCurrentStep("payment")}>
                      Back
                    </Button>
                    <Button onClick={handlePlaceOrder} disabled={isProcessing}>
                      {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Place Order - {formatPrice(total)}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-border bg-card p-6 sticky top-20">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">VAT (16%)</span>
                    <span>{formatPrice(vat)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>
                      {deliveryEstimate === 0 ? (
                        <span className="text-secondary">Free</span>
                      ) : (
                        formatPrice(deliveryEstimate)
                      )}
                    </span>
                  </div>
                </div>

                <div className="border-t my-4" />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <div className="mt-6 space-y-2">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.product.id} className="flex gap-2 items-center text-sm">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-muted">
                        <img
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-muted-foreground line-clamp-1 flex-1">{item.product.name}</span>
                      <span>×{item.quantity}</span>
                    </div>
                  ))}
                  {items.length > 3 && <p className="text-sm text-muted-foreground">+{items.length - 3} more items</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
