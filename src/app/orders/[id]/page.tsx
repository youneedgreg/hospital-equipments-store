"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Download,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

import Link from "next/link"

// Mock order data
const orderData = {
  id: "ORD-2024-001",
  status: "In Transit",
  orderDate: "2024-01-15",
  estimatedDelivery: "2024-01-18",
  trackingNumber: "1Z999AA1234567890",
  carrier: "UPS",
  shippingMethod: "Express Shipping",
  customer: {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@cityhospital.com",
    phone: "+1 (555) 123-4567",
    organization: "City General Hospital",
  },
  shippingAddress: {
    street: "123 Medical Center Dr",
    city: "Healthcare City",
    state: "HC",
    zipCode: "12345",
    country: "United States",
  },
  billingAddress: {
    street: "123 Medical Center Dr",
    city: "Healthcare City",
    state: "HC",
    zipCode: "12345",
    country: "United States",
  },
  items: [
    {
      id: 1,
      name: "Digital Blood Pressure Monitor",
      image: "/images/products/bp-monitor.png",
      price: 38998.7,
      quantity: 2,
      total: 77997.4,
    },
    {
      id: 2,
      name: "Pulse Oximeter Professional",
      image: "/professional-pulse-oximeter-medical-monitoring-dev.jpg",
      price: 10398.7,
      quantity: 1,
      total: 10398.7,
    },
  ],
  summary: {
    subtotal: 88396.1,
    shipping: 6498.7,
    tax: 7592,
    total: 102486.8,
  },
  timeline: [
    {
      status: "Order Placed",
      date: "2024-01-15",
      time: "10:30 AM",
      description: "Your order has been received and is being processed",
      completed: true,
    },
    {
      status: "Payment Confirmed",
      date: "2024-01-15",
      time: "10:35 AM",
      description: "Payment has been successfully processed",
      completed: true,
    },
    {
      status: "Processing",
      date: "2024-01-15",
      time: "2:15 PM",
      description: "Your order is being prepared for shipment",
      completed: true,
    },
    {
      status: "Shipped",
      date: "2024-01-16",
      time: "9:00 AM",
      description: "Your order has been shipped and is on its way",
      completed: true,
    },
    {
      status: "In Transit",
      date: "2024-01-17",
      time: "8:30 AM",
      description: "Package is in transit to your location",
      completed: true,
      current: true,
    },
    {
      status: "Out for Delivery",
      date: "2024-01-18",
      time: "Expected",
      description: "Package is out for delivery",
      completed: false,
    },
    {
      status: "Delivered",
      date: "2024-01-18",
      time: "Expected",
      description: "Package has been delivered",
      completed: false,
    },
  ],
}

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const [showFullTimeline, setShowFullTimeline] = useState(false)

  const getStatusProgress = () => {
    const completedSteps = orderData.timeline.filter((step) => step.completed).length
    return (completedSteps / orderData.timeline.length) * 100
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "in transit":
      case "out for delivery":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "processing":
      case "shipped":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/account?tab=orders"
              className="flex items-center text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Order {orderData.id}</h1>
                <p className="text-muted-foreground">
                  Placed on {orderData.orderDate} • Estimated delivery: {orderData.estimatedDelivery}
                </p>
              </div>
              <Badge className={getStatusColor(orderData.status)} variant="secondary">
                {orderData.status}
              </Badge>
            </div>
          </div>

          {/* Order Status Progress */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Status
              </CardTitle>
              <CardDescription>Track your order progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(getStatusProgress())}% Complete</span>
                </div>
                <Progress value={getStatusProgress()} className="h-2" />
              </div>

              {/* Current Status */}
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{orderData.status}</h3>
                  <p className="text-sm text-muted-foreground">
                    {orderData.timeline.find((step) => step.current)?.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">Tracking: {orderData.trackingNumber}</p>
                  <p className="text-sm text-muted-foreground">via {orderData.carrier}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-foreground">Order Timeline</h4>
                  <Button variant="ghost" size="sm" onClick={() => setShowFullTimeline(!showFullTimeline)}>
                    {showFullTimeline ? "Show Less" : "Show All"}
                  </Button>
                </div>

                <div className="space-y-4">
                  {(showFullTimeline ? orderData.timeline : orderData.timeline.slice(0, 3)).map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.completed
                              ? "bg-green-500 text-white"
                              : step.current
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {step.completed ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                        </div>
                        {index < orderData.timeline.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium text-foreground">{step.status}</h5>
                          <span className="text-sm text-muted-foreground">
                            {step.date} {step.time}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
                <CardDescription>{orderData.items.length} items in this order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        KES {item.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">KES {item.total}</p>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>KES {orderData.summary.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping ({orderData.shippingMethod})</span>
                    <span>KES {orderData.summary.shipping}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>KES {orderData.summary.tax}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>KES {orderData.summary.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping & Contact Info */}
            <div className="space-y-6">
              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{orderData.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{orderData.customer.organization}</p>
                    <p className="text-sm text-muted-foreground">{orderData.shippingAddress.street}</p>
                    <p className="text-sm text-muted-foreground">
                      {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{" "}
                      {orderData.shippingAddress.zipCode}
                    </p>
                    <p className="text-sm text-muted-foreground">{orderData.shippingAddress.country}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{orderData.customer.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{orderData.customer.phone}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Package className="w-4 h-4 mr-2" />
                    Track with {orderData.carrier}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
