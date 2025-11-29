"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string
  const fullName = formData.get("fullName") as string
  const businessPhone = formData.get("businessPhone") as string
  const organizationName = formData.get("organizationName") as string
  const organizationType = formData.get("organizationType") as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  console.log("Supabase signUp data.user:", data.user); // Temporary log

  if (data.user) {
    const adminSupabase = createAdminClient()

    // Update profile with additional info
    let profileUpdateData: Record<string, any> = {
      full_name: fullName,
      phone: businessPhone,
      role: role,
    };

    if (role !== "supplier") { // Only include these if not a supplier
        profileUpdateData.organization_name = organizationName;
        profileUpdateData.organization_type = organizationType;
    }

    const { error: profileError } = await adminSupabase
      .from("profiles")
      .update(profileUpdateData)
      .eq("id", data.user.id)

    if (profileError) {
      console.error("Error updating profile:", profileError)
    }

    // If supplier, create supplier record
    if (role === "supplier") {
      const businessName = formData.get("businessName") as string
      const contactPerson = formData.get("contactPerson") as string
      const position = formData.get("position") as string
      const businessEmail = formData.get("businessEmail") as string
      const businessPhone = formData.get("businessPhone") as string
      const kraPin = formData.get("kraPin") as string
      const location = formData.get("location") as string
      const businessAddress = formData.get("businessAddress") as string

      const { error: supplierError } = await adminSupabase
      .from("suppliers")
      .insert({
        profile_id: data.user.id,
        business_name: businessName,
        contact_person: contactPerson,
        position,
        business_email: businessEmail,
        business_phone: businessPhone,
        kra_pin: kraPin,
        location,
        business_address: businessAddress,
        verification_status: "pending",
      })

      if (supplierError) {
        console.error("Error creating supplier:", supplierError)
      }
    }
  }

  revalidatePath("/", "layout")
  redirect("/dashboard/" + role)
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  if (data.user) {
    // Get user role from profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single()

    const role = profile?.role || "buyer"
    revalidatePath("/", "layout")
    redirect("/dashboard/" + role)
  }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/login")
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/forgot-password/update-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function updatePassword(password: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
