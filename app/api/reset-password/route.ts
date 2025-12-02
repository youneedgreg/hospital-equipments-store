// app/api/reset-password/route.ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { code, password } = body

    if (!code || !password) {
      return NextResponse.json({ error: "Missing code or password" }, { status: 400 })
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 })
    }

    // Call Supabase admin recover endpoint.
    // NOTE: admin endpoint paths can vary with Supabase versions. This commonly works:
    const resp = await fetch(`${SUPABASE_URL}/auth/v1/admin/recover`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({
        token: code, // the code from ?code=... (Supabase admin expects `token` commonly)
        password,
      }),
    })

    const json = await resp.json()

    if (!resp.ok) {
      console.error("Supabase admin recover error:", json)
      return NextResponse.json(
        { error: json?.error || json?.message || "Password reset failed" },
        { status: resp.status }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("Error in reset-password route:", err)
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 })
  }
}
