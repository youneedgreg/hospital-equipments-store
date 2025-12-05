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

  const formData = await req.formData()
  const file = formData.get("avatar") as File

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(`${user.id}/${file.name}`, file, {
      cacheControl: "3600",
      upsert: true,
    })

  if (uploadError) {
    console.error("Error uploading avatar:", uploadError)
    return NextResponse.json({ error: "Error uploading avatar" }, { status: 500 })
  }

  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(uploadData.path)

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrlData.publicUrl })
    .eq("id", user.id)

  if (updateError) {
    console.error("Error updating profile:", updateError)
    return NextResponse.json({ error: "Error updating profile" }, { status: 500 })
  }

  return NextResponse.json({ avatarUrl: publicUrlData.publicUrl })
}
