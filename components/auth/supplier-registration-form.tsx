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
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { supplierRegistrationSchema } from "@/lib/validation/auth"
import { z } from "zod"

type SupplierRegistrationFormInputs = z.infer<typeof supplierRegistrationSchema>

export function SupplierRegistrationForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<SupplierRegistrationFormInputs>({
    resolver: zodResolver(supplierRegistrationSchema),
    defaultValues: {
      businessName: "",
      contactPerson: "",
      position: "",
      businessEmail: "",
      businessPhone: "",
      kraPin: "",
      location: "",
      businessAddress: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  const onSubmit = async (data: SupplierRegistrationFormInputs) => {
    try {
      const formData = new FormData()
      formData.append("role", "supplier")
      formData.append("fullName", data.contactPerson)
      formData.append("businessName", data.businessName)
      formData.append("contactPerson", data.contactPerson)
      formData.append("position", data.position)
      formData.append("email", data.businessEmail) // This is the email
      formData.append("businessEmail", data.businessEmail)
      formData.append("businessPhone", data.businessPhone)
      formData.append("kraPin", data.kraPin)
      formData.append("location", data.location)
      formData.append("businessAddress", data.businessAddress)
      formData.append("password", data.password)
      formData.append("confirmPassword", data.confirmPassword) // For consistency, though server might not need it

      const result = await signUp(formData)

      if (result?.error) {
        toast({
          title: "Registration failed",
          description: result.error,
          variant: "destructive",
        })
        console.error("Supplier registration error:", result.error)
        setError("businessEmail", { type: "manual", message: result.error }) // Example: set error on email field if server returns general error
      } else {
        toast({
          title: "Registration successful!",
          description: "Your supplier account has been created.",
        })
        reset()
        // If successful, redirection happens in the server action, or we can explicitly redirect here
        // router.push("/dashboard/supplier");
      }
    } catch (error) {
      console.error("An unexpected error occurred during supplier registration:", error)
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="businessName">Business Name</Label>
        <Input id="businessName" placeholder="MedSupply Kenya Ltd" {...register("businessName")} />
        {errors.businessName && <p className="text-sm text-red-500">{errors.businessName.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contactPerson">Contact Person</Label>
          <Input id="contactPerson" placeholder="Jane Muthoni" {...register("contactPerson")} />
          {errors.contactPerson && <p className="text-sm text-red-500">{errors.contactPerson.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input id="position" placeholder="Managing Director" {...register("position")} />
          {errors.position && <p className="text-sm text-red-500">{errors.position.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessEmail">Business Email</Label>
        <Input id="businessEmail" type="email" placeholder="contact@medsupply.co.ke" {...register("businessEmail")} />
        {errors.businessEmail && <p className="text-sm text-red-500">{errors.businessEmail.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessPhone">Business Phone</Label>
        <Input id="businessPhone" type="tel" placeholder="+254 700 000 000" {...register("businessPhone")} />
        {errors.businessPhone && <p className="text-sm text-red-500">{errors.businessPhone.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="kraPin">KRA PIN</Label>
        <Input id="kraPin" placeholder="A000000000A" {...register("kraPin")} />
        <p className="text-xs text-muted-foreground">Required for verification. We verify all suppliers.</p>
        {errors.kraPin && <p className="text-sm text-red-500">{errors.kraPin.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Controller
          control={control}
          name="location"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="location">
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
          )}
        />
        {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessAddress">Business Address</Label>
        <Textarea id="businessAddress" placeholder="Industrial Area, Nairobi" rows={2} {...register("businessAddress")} />
        {errors.businessAddress && <p className="text-sm text-red-500">{errors.businessAddress.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" {...register("password")} />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          Must be at least 8 characters with a number and special character
        </p>
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword" type="password" placeholder="••••••••" {...register("confirmPassword")} />
        {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
      </div>

      <div className="flex items-start gap-2 pt-2">
        <input type="checkbox" id="terms" className="mt-1 rounded border-input" {...register("terms")} />
        <Label htmlFor="terms" className="text-sm font-normal leading-relaxed">
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
      {errors.terms && <p className="text-sm text-red-500">{errors.terms.message}</p>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Supplier Account
      </Button>
    </form>
  )
}

