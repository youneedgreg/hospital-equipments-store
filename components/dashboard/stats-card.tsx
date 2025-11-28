import type React from "react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatsCard({ title, value, description, icon, trend, className }: StatsCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-6", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
      </div>
      <div className="mt-3">
        <p className="text-3xl font-bold">{value}</p>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <p className={cn("text-sm mt-1 font-medium", trend.isPositive ? "text-secondary" : "text-destructive")}>
            {trend.isPositive ? "+" : ""}
            {trend.value}% from last month
          </p>
        )}
      </div>
    </div>
  )
}
