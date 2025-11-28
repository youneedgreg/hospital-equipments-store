"use server"

import { createClient } from "@/lib/supabase/server"

export async function uploadImage(file: File, path: string) {
  const supabase = await createClient()

  const fileExt = file.name.split(".").pop()
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `${path}/${fileName}`

  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) {
    console.error("Error uploading image:", error)
    return { data: null, error: error.message }
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(filePath)

  return { data: { path: filePath, url: publicUrl }, error: null }
}

export async function deleteImage(path: string) {
  const supabase = await createClient()

  const { error } = await supabase.storage.from("product-images").remove([path])

  if (error) {
    console.error("Error deleting image:", error)
    return { error: error.message }
  }

  return { error: null }
}

