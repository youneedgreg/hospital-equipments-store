"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export function SupplierRegistrationForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push("/dashboard/supplier")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="business-name">Business Name</Label>
        <Input id="business-name" placeholder="MedSupply Kenya Ltd" required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Contact Person</Label>
          <Input id="contact-name" placeholder="Jane Muthoni" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input id="position" placeholder="Managing Director" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="business-email">Business Email</Label>
        <Input id="business-email" type="email" placeholder="contact@medsupply.co.ke" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="business-phone">Business Phone</Label>
        <Input id="business-phone" type="tel" placeholder="+254 700 000 000" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="kra-pin">KRA PIN</Label>
        <Input id="kra-pin" placeholder="A000000000A" required />
        <p className="text-xs text-muted-foreground">Required for verification. We verify all suppliers.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select county" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nairobi">Nairobi</SelectItem>
            <SelectItem value="mombasa">Mombasa</SelectItem>
            <SelectItem value="kisumu">Kisumu</SelectItem>
            <SelectItem value="nakuru">Nakuru</SelectItem>
            <SelectItem value="eldoret">Eldoret</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="business-address">Business Address</Label>
        <Textarea id="business-address" placeholder="Industrial Area, Nairobi" rows={2} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="supplier-password">Password</Label>
        <div className="relative">
          <Input id="supplier-password" type={showPassword ? "text" : "password"} placeholder="••••••••" required />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="supplier-confirm-password">Confirm Password</Label>
        <Input id="supplier-confirm-password" type="password" placeholder="••••••••" required />
      </div>

      <div className="flex items-start gap-2 pt-2">
        <input type="checkbox" id="supplier-terms" className="mt-1 rounded border-input" required />
        <Label htmlFor="supplier-terms" className="text-sm font-normal leading-relaxed">
          I agree to the{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>
          ,{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
          , and{" "}
          <a href="/supplier-agreement" className="text-primary hover:underline">
            Supplier Agreement
          </a>
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Supplier Account
      </Button>
    </form>
  )
}
