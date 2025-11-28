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
import { signUp } from "@/lib/actions/auth"
import { useToast } from "@/hooks/use-toast"

export function SupplierRegistrationForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.append("role", "supplier")
    formData.append("fullName", formData.get("contact-name") as string)
    formData.append("businessName", formData.get("business-name") as string)
    formData.append("contactPerson", formData.get("contact-name") as string)
    formData.append("position", formData.get("position") as string)
    formData.append("businessEmail", formData.get("business-email") as string)
    formData.append("businessPhone", formData.get("business-phone") as string)
    formData.append("kraPin", formData.get("kra-pin") as string)
    formData.append("location", formData.get("location") as string)
    formData.append("businessAddress", formData.get("business-address") as string)

    const result = await signUp(formData)

    if (result?.error) {
      toast({
        title: "Registration failed",
        description: result.error,
        variant: "destructive",
      })
      setIsLoading(false)
    }
    // If successful, redirect happens in the server action
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="business-name">Business Name</Label>
        <Input id="business-name" name="business-name" placeholder="MedSupply Kenya Ltd" required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Contact Person</Label>
          <Input id="contact-name" name="contact-name" placeholder="Jane Muthoni" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input id="position" name="position" placeholder="Managing Director" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="business-email">Business Email</Label>
        <Input id="business-email" name="business-email" type="email" placeholder="contact@medsupply.co.ke" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="business-phone">Business Phone</Label>
        <Input id="business-phone" name="business-phone" type="tel" placeholder="+254 700 000 000" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="kra-pin">KRA PIN</Label>
        <Input id="kra-pin" name="kra-pin" placeholder="A000000000A" required />
        <p className="text-xs text-muted-foreground">Required for verification. We verify all suppliers.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Select name="location">
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
        <Textarea id="business-address" name="business-address" placeholder="Industrial Area, Nairobi" rows={2} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="supplier-password">Password</Label>
        <div className="relative">
          <Input id="supplier-password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" required minLength={8} />
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
        <Input id="supplier-confirm-password" name="confirm-password" type="password" placeholder="••••••••" required />
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
