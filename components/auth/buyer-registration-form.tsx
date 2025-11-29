"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { signUp } from "@/lib/actions/auth"
import { useToast } from "@/hooks/use-toast"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { buyerRegistrationSchema } from "@/lib/validation/auth"
import { z } from "zod"

type BuyerRegistrationFormInputs = z.infer<typeof buyerRegistrationSchema>

export function BuyerRegistrationForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    reset
  } = useForm<BuyerRegistrationFormInputs>({
    resolver: zodResolver(buyerRegistrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      organization: "",
      organizationType: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  const onSubmit = async (data: BuyerRegistrationFormInputs) => {
    try {
      const formData = new FormData()
      formData.append("role", "buyer")
      formData.append("fullName", `${data.firstName} ${data.lastName}`)
      formData.append("firstName", data.firstName)
      formData.append("lastName", data.lastName)
      formData.append("email", data.email)
      formData.append("phone", data.phone)
      formData.append("organizationName", data.organization || "")
      formData.append("organizationType", data.organizationType)
      formData.append("password", data.password)
      formData.append("confirmPassword", data.confirmPassword) // Although not strictly needed by server, useful for client-side consistency

      const result = await signUp(formData)

      if (result?.error) {
        toast({
          title: "Registration failed",
          description: result.error,
          variant: "destructive",
        })
        console.error("Buyer registration error:", result.error)
        setError("email", { type: "manual", message: result.error }) // Example: set error on email field if server returns general error
      } else {
        toast({
          title: "Registration successful!",
          description: "Your buyer account has been created.",
        })
        reset()
        // If successful, redirection happens in the server action, or we can explicitly redirect here
        // router.push("/dashboard/buyer");
      }
    } catch (error) {
      console.error("An unexpected error occurred during buyer registration:", error)
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="John" {...register("firstName")} />
          {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Doe" {...register("lastName")} />
          {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="you@hospital.co.ke" {...register("email")} />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" placeholder="+254 700 000 000" {...register("phone")} />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="organization">Organization (Optional)</Label>
        <Input id="organization" placeholder="Nairobi Regional Hospital" {...register("organization")} />
        {errors.organization && <p className="text-sm text-red-500">{errors.organization.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="organizationType">Organization Type</Label>
        <Controller
          control={control}
          name="organizationType"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="organizationType">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hospital">Hospital</SelectItem>
                <SelectItem value="clinic">Clinic</SelectItem>
                <SelectItem value="pharmacy">Pharmacy</SelectItem>
                <SelectItem value="ngo">NGO</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.organizationType && <p className="text-sm text-red-500">{errors.organizationType.message}</p>}
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
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </Label>
      </div>
      {errors.terms && <p className="text-sm text-red-500">{errors.terms.message}</p>}


      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Buyer Account
      </Button>
    </form>
  )
}
