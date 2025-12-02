"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { resetPassword, signInWithMagicLink } from "@/lib/actions/auth"
import { LogoIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, Mail } from "lucide-react"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMagicLinkLoading, setIsMagicLinkLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("email", email)
      const result = await resetPassword(formData)
      if (result?.error) {
        toast.error(result.error)
      } else {
        setIsSubmitted(true)
      }
    } catch (error) {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleMagicLinkSignIn = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter your email address.")
      return
    }
    setIsMagicLinkLoading(true)
    try {
      const result = await signInWithMagicLink(email)
      if (result?.error) {
        toast.error(result.error)
      } else {
        setIsSubmitted(true)
        toast.success("Check your email for a magic link to log in.")
      }
    } catch (error) {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsMagicLinkLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <LogoIcon className="h-10 w-10" />
          <span className="text-2xl font-bold">BIOSYTEMS</span>
        </Link>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold tracking-tight">
                Forgot your password?
              </h1>
              <p className="mt-2 text-muted-foreground">
                Enter your email and we'll send you a reset link
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.co.ke"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Reset Link
              </Button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleMagicLinkSignIn}
                disabled={isMagicLinkLoading || isLoading}
              >
                {isMagicLinkLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign in with Magic Link
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/20">
              <Mail className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Check your email
            </h1>
            <p className="mt-2 text-muted-foreground">
              We've sent a password reset link to {email}. The link will expire
              in 24 hours.
            </p>
            <Button
              variant="outline"
              className="mt-6 bg-transparent"
              onClick={() => setIsSubmitted(false)}
            >
              Try another email
            </Button>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
