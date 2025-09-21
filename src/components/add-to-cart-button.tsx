"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AddToCartButtonProps {
  productId: number
  productName: string
  disabled?: boolean
  className?: string
}

export function AddToCartButton({ productId, productName, disabled = false, className }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    if (disabled) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Here you would typically add to cart context/state
    console.log(`Added product ${productId} (${productName}) to cart`)

    setIsAdded(true)
    setIsLoading(false)

    // Reset the button after 2 seconds
    setTimeout(() => setIsAdded(false), 2000)
  }

  if (isAdded) {
    return (
      <Button className={className} disabled>
        <Check className="w-4 h-4 mr-2" />
        Added to Cart
      </Button>
    )
  }

  return (
    <Button onClick={handleAddToCart} disabled={disabled || isLoading} className={className}>
      <ShoppingCart className="w-4 h-4 mr-2" />
      {isLoading ? "Adding..." : disabled ? "Out of Stock" : "Add to Cart"}
    </Button>
  )
}
