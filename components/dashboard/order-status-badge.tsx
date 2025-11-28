import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
type PaymentStatus = "pending" | "paid" | "failed" | "refunded"

interface OrderStatusBadgeProps {
  status: OrderStatus | PaymentStatus
  type?: "order" | "payment"
}

const orderStatusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-chart-4/20 text-chart-4 border-chart-4/30" },
  confirmed: { label: "Confirmed", className: "bg-primary/20 text-primary border-primary/30" },
  processing: { label: "Processing", className: "bg-chart-3/20 text-chart-3 border-chart-3/30" },
  shipped: { label: "Shipped", className: "bg-secondary/20 text-secondary border-secondary/30" },
  delivered: { label: "Delivered", className: "bg-secondary/20 text-secondary border-secondary/30" },
  cancelled: { label: "Cancelled", className: "bg-destructive/20 text-destructive border-destructive/30" },
}

const paymentStatusConfig: Record<PaymentStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-chart-4/20 text-chart-4 border-chart-4/30" },
  paid: { label: "Paid", className: "bg-secondary/20 text-secondary border-secondary/30" },
  failed: { label: "Failed", className: "bg-destructive/20 text-destructive border-destructive/30" },
  refunded: { label: "Refunded", className: "bg-muted text-muted-foreground border-muted-foreground/30" },
}

export function OrderStatusBadge({ status, type = "order" }: OrderStatusBadgeProps) {
  const config =
    type === "payment" ? paymentStatusConfig[status as PaymentStatus] : orderStatusConfig[status as OrderStatus]

  return (
    <Badge variant="outline" className={cn("font-medium", config.className)}>
      {config.label}
    </Badge>
  )
}
