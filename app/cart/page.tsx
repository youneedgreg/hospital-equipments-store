"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/data"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart()

  const VAT_RATE = 0.16
  const vat = subtotal * VAT_RATE
  const deliveryEstimate = subtotal > 50000 ? 0 : 2500
  const total = subtotal + vat + deliveryEstimate

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="mt-2 text-muted-foreground max-w-md">
              Looks like you haven't added any medical supplies yet. Browse our catalog to find what you need.
            </p>
            <Link href="/products">
              <Button className="mt-6" size="lg">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-card">
                <div className="hidden sm:grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-muted-foreground">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>

                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.product.id} className="p-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Product Info */}
                        <div className="col-span-12 sm:col-span-6">
                          <div className="flex gap-4">
                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                              <img
                                src={item.product.image || "/placeholder.svg"}
                                alt={item.product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <Link
                                href={`/products/${item.product.id}`}
                                className="font-medium hover:text-primary line-clamp-2"
                              >
                                {item.product.name}
                              </Link>
                              <p className="text-sm text-muted-foreground mt-1">{item.product.supplier}</p>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="flex items-center gap-1 text-sm text-destructive hover:underline mt-2 sm:hidden"
                              >
                                <Trash2 className="h-4 w-4" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-4 sm:col-span-2 text-left sm:text-center">
                          <span className="sm:hidden text-sm text-muted-foreground">Price: </span>
                          <span className="font-medium">{formatPrice(item.product.price)}</span>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-4 sm:col-span-2 flex justify-start sm:justify-center">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="col-span-4 sm:col-span-2 text-right">
                          <span className="sm:hidden text-sm text-muted-foreground">Subtotal: </span>
                          <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="hidden sm:block ml-auto mt-2 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <Link href="/products">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
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
                    <span className="text-muted-foreground">Delivery Estimate</span>
                    <span>
                      {deliveryEstimate === 0 ? (
                        <span className="text-secondary">Free</span>
                      ) : (
                        formatPrice(deliveryEstimate)
                      )}
                    </span>
                  </div>
                  {deliveryEstimate > 0 && (
                    <p className="text-xs text-muted-foreground">Free delivery on orders over KSh 50,000</p>
                  )}
                </div>

                <div className="border-t my-4" />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <Link href="/checkout" className="block mt-6">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <div className="mt-4 p-3 rounded-lg bg-secondary/10">
                  <p className="text-xs text-center text-muted-foreground">
                    Secure checkout with MPesa integration. Your payment information is protected.
                  </p>
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
