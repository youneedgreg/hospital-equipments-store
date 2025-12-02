"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { updatePassword } from "@/lib/actions/auth"
import { createClient } from "@/lib/supabase/client"
import { LogoIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function UpdatePasswordPageContent() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [invalidLink, setInvalidLink] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  // Read token from URL fragment like "#access_token=...&refresh_token=...&type=recovery"
  const getFromHash = (key: string): string | null => {
    if (typeof window === "undefined") return null
    const hash = window.location.hash || ""
    if (!hash) return null
    const params = new URLSearchParams(hash.replace(/^#/, ""))
    return params.get(key)
  }

  useEffect(() => {
    const handleAuth = async () => {
      const accessToken =
        searchParams.get("access_token") ?? getFromHash("access_token")
      const refreshToken =
        searchParams.get("refresh_token") ?? getFromHash("refresh_token")
      const type = searchParams.get("type") ?? getFromHash("type")

      // Ensure it's the recovery flow and we have required tokens.
      // Types are string | null from get/search, so we check at runtime before calling setSession.
      if (accessToken && type === "recovery") {
        if (!refreshToken) {
          // Missing refresh token — very common when link is opened inside some email clients.
          toast.error(
            "Reset link missing required data. Try opening the email link in your browser or request a new reset email."
          )
          setInvalidLink(true)
          setIsAuthenticating(false)
          return
        }

        // Now both accessToken and refreshToken are non-null strings — safe to call setSession
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })

        if (error) {
          toast.error("Invalid or expired reset link.")
          setInvalidLink(true)
          setIsAuthenticating(false)
          return
        }

        setIsAuthenticating(false)
        return
      }

      // Tokens missing or not recovery type
      setInvalidLink(true)
      setIsAuthenticating(false)
    }

    handleAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    setIsLoading(true)
    try {
      const result = await updatePassword(password)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("Password updated successfully!")
        router.push("/login")
      }
    } catch (error) {
      console.error(error)
      toast.error("An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isAuthenticating) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying reset link...</p>
        </div>
      </div>
    )
  }

  if (invalidLink) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm text-center">
          <LogoIcon className="h-10 w-10 mx-auto mb-6" />
          <h2 className="text-xl font-semibold mb-2">Invalid or expired reset link</h2>
          <p className="text-muted-foreground mb-6">
            The password reset link appears to be invalid or missing required data. This can happen
            if the link was opened inside an email app that strips secure tokens. Please open the
            email link in your browser or request a new password reset email.
          </p>
          <div className="flex gap-2 justify-center">
            <Link href="/forgot-password">
              <Button>Request new reset email</Button>
            </Link>
            <Link href="/login" className="inline-flex items-center">
              <Button variant="ghost">Back to login</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <LogoIcon className="h-10 w-10" />
          <span className="text-2xl font-bold">BIOSYTEMS</span>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Update your password</h1>
          <p className="mt-2 text-muted-foreground">Enter your new password below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Password
          </Button>
        </form>

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
