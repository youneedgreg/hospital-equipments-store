import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookies().getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookies().set(name, value, options))
        },
      },
    }
  )
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { verificationId, status, reason } = await req.json()

  if (!verificationId || !status) {
    return NextResponse.json({ error: "Missing verificationId or status" }, { status: 400 })
  }

  // Update the verification status
  const { data: updatedVerification, error: updateError } = await supabase
    .from("verifications")
    .update({ status, reason: status === "rejected" ? reason : null })
    .eq("id", verificationId)
    .select()
    .single()

  if (updateError) {
    console.error("Error updating verification status:", updateError)
    return NextResponse.json({ error: "Error updating verification status" }, { status: 500 })
  }

  // If approved, update the supplier's profile to verified
  if (status === "approved") {
    const { error: profileUpdateError } = await supabase
      .from("profiles")
      .update({ verification_status: "verified" })
      .eq("id", updatedVerification.profile_id)

    if (profileUpdateError) {
      console.error("Error updating supplier verification status:", profileUpdateError)
      return NextResponse.json({ error: "Error updating supplier verification status" }, { status: 500 })
    }
  }

  return NextResponse.json({ message: "Verification updated successfully", updatedVerification })
}
