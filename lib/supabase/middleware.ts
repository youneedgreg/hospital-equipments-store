import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let userRole: string | null = null
  if (user) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (!error && profile) {
      userRole = profile.role
    } else if (user.user_metadata && user.user_metadata.role) {
      userRole = user.user_metadata.role
    }
  }

  // Protected routes for unauthenticated users
  if (
    !user &&
    (request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/checkout") ||
      request.nextUrl.pathname.startsWith("/cart"))
  ) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // Role-based protection for dashboard routes
  if (user && request.nextUrl.pathname.startsWith("/dashboard")) {
    const requestedDashboard = request.nextUrl.pathname.split("/")[2] // e.g., "buyer", "supplier", "admin"
    if (userRole && requestedDashboard && requestedDashboard !== userRole) {
      const url = request.nextUrl.clone()
      url.pathname = `/dashboard/${userRole}`
      return NextResponse.redirect(url)
    } else if (!userRole && requestedDashboard) {
      // If user has no role but is trying to access a dashboard, redirect to a default or login
      const url = request.nextUrl.clone()
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }
  }

  // Redirect authenticated users away from auth pages
  if (
    user &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register"))
  ) {
    const url = request.nextUrl.clone()
    url.pathname = `/dashboard/${userRole || "buyer"}` // Use actual user role or default to buyer
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}


