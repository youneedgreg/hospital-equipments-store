import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
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

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profileError || !profile || profile.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: verifications, error: verificationsError } = await supabase
    .from("verifications")
    .select(
      `
      id,
      created_at,
      status,
      reason,
      profiles (
        full_name,
        email,
        phone,
        organization_name,
        organization_type,
        kra_pin
      ),
      verification_documents (
        id,
        document_type,
        file_url,
        status
      )
    `
    )
    .order("created_at", { ascending: false })

  if (verificationsError) {
    console.error("Error fetching verifications:", verificationsError)
    return NextResponse.json({ error: "Error fetching verifications" }, { status: 500 })
  }

  return NextResponse.json({ verifications }, { status: 200 })
}
