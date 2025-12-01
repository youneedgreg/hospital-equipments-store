import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import { formatPrice, type Product } from "@/lib/data"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      await addItem(product, 1)
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding the product to your cart.",
        variant: "destructive",
      })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="group rounded-xl border border-border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-primary/20">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
          {product.originalPrice && product.inStock && (
            <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">Sale</Badge>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="mb-1">
          <Badge variant="outline" className="text-xs font-normal">
            {product.category}
          </Badge>
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
        </Link>

        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>

        <div className="mt-2 flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-chart-4 text-chart-4" />
            <span className="font-medium">{product.rating}</span>
          </div>
          <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
        </div>

        <div className="mt-1 text-xs text-muted-foreground">
          by <span className="text-foreground">{product.supplier}</span>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-lg font-bold">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</p>
            )}
          </div>
          <Button size="sm" disabled={!product.inStock || isAdding} onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4 mr-1" />
            {isAdding ? "Adding..." : "Add"}
          </Button>
        </div>
      </div>
    </div>
  )
}
