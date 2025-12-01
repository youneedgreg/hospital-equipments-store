import { NextRequest, NextResponse } from "next/server"
import { getSuppliers } from "@/lib/actions/products"

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await getSuppliers()

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ suppliers: data })
  } catch (error) {
    console.error("Error in suppliers API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
