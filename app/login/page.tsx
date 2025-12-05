"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogoIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { signIn, signInWithMagicLink } from "@/lib/actions/auth"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("buyer")
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  useEffect(() => {
    if (loginSuccess) {
      fetch("/api/user")
        .then((res) => res.json())
        .then((data) => {
          if (data.redirectUrl) {
            router.push(data.redirectUrl)
          } else {
            // Handle error case where redirectUrl is not available
            toast({
              title: "Error",
              description: "Could not redirect to dashboard.",
              variant: "destructive",
            })
          }
        })
    }
  }, [loginSuccess, router, toast])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await signIn(formData)

    if (result?.error) {
      toast({
        title: "Login failed",
        description: result.error,
        variant: "destructive",
      })
      setIsLoading(false)
    } else {
      toast({
        title: "Login successful",
        description: "You will be redirected to your dashboard shortly.",
      })
      setLoginSuccess(true)
    }
  }

  const handleMagicLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const result = await signInWithMagicLink(email)
    setIsLoading(false)

    if (result?.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      setMagicLinkSent(true)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <LogoIcon className="h-10 w-10" />
            <span className="text-2xl font-bold">BIOSYTEMS</span>
          </Link>

          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">Sign in to your account to continue</p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="buyer">Buyer</TabsTrigger>
              <TabsTrigger value="supplier">Supplier</TabsTrigger>
              <TabsTrigger value="magiclink">Magic Link</TabsTrigger>
            </TabsList>

            <TabsContent value="buyer" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="buyer-email">Email address</Label>
                  <Input id="buyer-email" name="email" type="email" placeholder="you@hospital.co.ke" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="buyer-password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="buyer-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign in as Buyer
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="supplier" className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier-email">Business Email</Label>
                  <Input id="supplier-email" name="email" type="email" placeholder="you@medsupply.co.ke" required />
                </div>
                <div className="space-y-2">.
                  <div className="flex items-center justify-between">
                    <Label htmlFor="supplier-password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="supplier-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign in as Supplier
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="magiclink" className="mt-6">
              {magicLinkSent ? (
                <div className="text-center text-muted-foreground">
                  <p>A magic link has been sent to your email address. Click the link to sign in.</p>
                </div>
              ) : (
                <form onSubmit={handleMagicLink} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="magic-email">Email address</Label>
                    <Input id="magic-email" name="email" type="email" placeholder="you@example.com" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Magic Link
                  </Button>
                </form>
              )}
            </TabsContent>
          </Tabs>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary">
          <img
            src="/healthcare-professionals-working-in-modern-hospita.jpg"
            alt="Healthcare professionals"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-12 text-primary-foreground">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold mb-4">Trusted Medical Supplies, Delivered</h2>
            <p className="text-lg opacity-90">
              Join Kenya's largest network of healthcare providers and verified suppliers. Access quality equipment with
              secure MPesa payments.
            </p>
            <div className="mt-8 flex items-center justify-center gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold">500+</p>
                <p className="text-sm opacity-80">Facilities</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">2,000+</p>
                <p className="text-sm opacity-80">Suppliers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-sm opacity-80">Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
