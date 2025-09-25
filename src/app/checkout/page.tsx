"use client"

import { useState } from "react"
import { CreditCard, Lock, MapPin, ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

import Link from "next/link"

// Mock cart data for checkout
const cartItems = [
  {
    id: 1,
    name: "Digital Blood Pressure Monitor",
    price: 38998.7,
    quantity: 2,
    image: "/images/products/bp-monitor.png",
  },
  {
    id: 2,
    name: "Surgical Stethoscope Premium",
    price: 24698.7,
    quantity: 1,
    image: "/premium-surgical-stethoscope-medical-instrument.jpg",
  },
  {
    id: 4,
    name: "Pulse Oximeter Professional",
    price: 10398.7,
    quantity: 3,
    image: "/professional-pulse-oximeter-medical-monitoring-dev.jpg",
  },
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [sameAsBilling, setSameAsBilling] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = shippingMethod === "express" ? 6498.7 : shippingMethod === "overnight" ? 12998.7 : 3898.7
  const tax = subtotal * 0.08
  const total = subtotal + shippingCost + tax

  const handleShippingChange = (field: string, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // Redirect to success page or show success message
    alert("Order placed successfully!")
    setIsProcessing(false)
  }

  const steps = [
    { number: 1, title: "Shipping", completed: currentStep > 1 },
    { number: 2, title: "Payment", completed: currentStep > 2 },
    { number: 3, title: "Review", completed: false },
  ]

  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/cart" className="flex items-center text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-4">Checkout</h1>

            {/* Progress Steps */}
            <div className="flex items-center space-x-4 mb-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.completed
                        ? "bg-green-500 text-white"
                        : currentStep === step.number
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.completed ? <Check className="w-4 h-4" /> : step.number}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      currentStep === step.number ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && <div className="w-8 h-px bg-border mx-4" />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={shippingInfo.firstName}
                          onChange={(e) => handleShippingChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={shippingInfo.lastName}
                          onChange={(e) => handleShippingChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => handleShippingChange("email", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={shippingInfo.phone}
                          onChange={(e) => handleShippingChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        value={shippingInfo.organization}
                        onChange={(e) => handleShippingChange("organization", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) => handleShippingChange("address", e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={shippingInfo.city}
                          onChange={(e) => handleShippingChange("city", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select
                          value={shippingInfo.state}
                          onValueChange={(value) => handleShippingChange("state", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={(e) => handleShippingChange("zipCode", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Shipping Method</Label>
                      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                        <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="flex-1 cursor-pointer">
                            <div className="flex justify-between">
                              <span>Standard Shipping (5-7 business days)</span>
                              <span className="font-medium">KES 3898.7</span>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="flex-1 cursor-pointer">
                            <div className="flex justify-between">
                              <span>Express Shipping (2-3 business days)</span>
                              <span className="font-medium">KES 6498.7</span>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                          <RadioGroupItem value="overnight" id="overnight" />
                          <Label htmlFor="overnight" className="flex-1 cursor-pointer">
                            <div className="flex justify-between">
                              <span>Overnight Shipping (1 business day)</span>
                              <span className="font-medium">KES 12998.7</span>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button onClick={() => setCurrentStep(2)} className="w-full">
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <Label>Payment Method</Label>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex-1 cursor-pointer">
                            Credit/Debit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                            PayPal
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border border-border rounded-lg">
                          <RadioGroupItem value="purchase-order" id="purchase-order" />
                          <Label htmlFor="purchase-order" className="flex-1 cursor-pointer">
                            Purchase Order (Net 30)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="nameOnCard">Name on Card</Label>
                          <Input
                            id="nameOnCard"
                            value={paymentInfo.nameOnCard}
                            onChange={(e) => handlePaymentChange("nameOnCard", e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={paymentInfo.cardNumber}
                            onChange={(e) => handlePaymentChange("cardNumber", e.target.value)}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={paymentInfo.expiryDate}
                              onChange={(e) => handlePaymentChange("expiryDate", e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={paymentInfo.cvv}
                              onChange={(e) => handlePaymentChange("cvv", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox id="sameAsBilling" checked={sameAsBilling} onCheckedChange={setSameAsBilling} />
                      <Label htmlFor="sameAsBilling">Billing address same as shipping</Label>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1 bg-transparent">
                        Back to Shipping
                      </Button>
                      <Button onClick={() => setCurrentStep(3)} className="flex-1">
                        Review Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Order Review */}
              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">KES {(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>KES {subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>KES {shippingCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>KES {tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>KES {total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1 bg-transparent">
                        Back to Payment
                      </Button>
                      <Button onClick={handlePlaceOrder} disabled={isProcessing} className="flex-1">
                        <Lock className="w-4 h-4 mr-2" />
                        {isProcessing ? "Processing..." : "Place Order"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium">KES {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>KES {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>KES {shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>KES {tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>KES {total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>Secure checkout with 256-bit SSL encryption</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
