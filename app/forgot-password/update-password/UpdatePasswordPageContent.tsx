"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { updatePassword } from "@/lib/actions/auth"
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
  const [debugConfirmationUrl, setDebugConfirmationUrl] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  // read token from URL fragment (#access_token=...&refresh_token=...&type=recovery)
  const getFromHash = (key: string): string | null => {
    if (typeof window === "undefined") return null
    const hash = window.location.hash || ""
    if (!hash) return null
    const params = new URLSearchParams(hash.replace(/^#/, ""))
    return params.get(key)
  }

  useEffect(() => {
    const run = async () => {
      // debug: show current URL (remove in production)
      if (typeof window !== "undefined") setDebugConfirmationUrl(window.location.href)

      // 1) If there's a `code` query param (PKCE / auth code), try client-side exchange first
      const code = searchParams.get("code")
      if (code) {
        try {
          // Try exchangeCodeForSession (may fail for PKCE flows that need code_verifier)
          // If it works, the user will have a session and we can show the password form.
          // If it fails, we'll fall back to server-side POST on submit.
          // NOTE: some supabase SDK versions may not have exchangeCodeForSession — if your SDK lacks it,
          // this call will throw; that's okay because we handle fallback.
          // @ts-ignore - some SDK types may differ; runtime call is attempted.
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)

          if (!error && data) {
            // success; session available
            setIsAuthenticating(false)
            return
          }

          // If exchange fails, don't treat as fatal here — we'll allow submission to server route.
          console.warn("exchangeCodeForSession did not succeed, will fallback to server route", error)
          // proceed to allow the form to render (so user can submit to server)
          setIsAuthenticating(false)
          return
        } catch (err) {
          // ignore — fallback to server POST on submit
          console.warn("exchangeCodeForSession error (falling back):", err)
          setIsAuthenticating(false)
          return
        }
      }

      // 2) If no code param, fall back to reading tokens from fragment (#access_token=... etc.)
      const accessToken = searchParams.get("access_token") ?? getFromHash("access_token")
      const refreshToken = searchParams.get("refresh_token") ?? getFromHash("refresh_token")
      const type = searchParams.get("type") ?? getFromHash("type")

      if (accessToken && type === "recovery") {
        if (!refreshToken) {
          toast.error(
            "Reset link missing data. Try opening the email link in your browser or request a new reset email."
          )
          setInvalidLink(true)
          setIsAuthenticating(false)
          return
        }

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

      // no usable tokens/code found
      setInvalidLink(true)
      setIsAuthenticating(false)
    }

    run()
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
      // If user already has a valid session (set by exchangeCodeForSession or fragment set), we can use updatePassword()
      // Otherwise, if code exists we POST to server-admin route to complete the reset
      const code = searchParams.get("code")
      // Check if we have a logged-in session (try getUser)
      let hasSession = false
      try {
        const { data: userData } = await supabase.auth.getUser()
        if (userData?.user) hasSession = true
      } catch (err) {
        // ignore
      }

      if (hasSession) {
        // normal flow: logged-in -> update password via client action
        const result = await updatePassword(password)
        if (result?.error) {
          toast.error(result.error)
        } else {
          toast.success("Password updated successfully!")
          router.push("/login")
        }
      } else {
        // No session: rely on server admin route with code
        if (!code) {
          toast.error("Missing reset code. Request a new reset email.")
          setIsLoading(false)
          return
        }

        const res = await fetch("/api/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, password }),
        })

        const json = await res.json()
        if (!res.ok) {
          toast.error(json?.error ?? "Reset failed")
        } else {
          toast.success("Password updated successfully!")
          router.push("/login")
        }
      }
    } catch (err) {
      console.error(err)
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
            The password reset link appears to be invalid, expired, or missing required data.
            This can happen if the link was opened inside an email app that strips secure tokens or
            if the code expired. Try opening the link directly in your browser or request a new
            password reset email.
          </p>

          <div className="flex gap-2 justify-center">
            <Link href="/forgot-password">
              <Button>Request new reset email</Button>
            </Link>
            <Link href="/login" className="inline-flex items-center">
              <Button variant="ghost">Back to login</Button>
            </Link>
          </div>

          {debugConfirmationUrl && (
            <div className="mt-6 text-xs text-muted-foreground break-all">
              <div className="font-medium mb-1">Debug: current URL</div>
              <div>{debugConfirmationUrl}</div>
            </div>
          )}
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
