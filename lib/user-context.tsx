"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface Profile {
  id: string
  email: string
  full_name: string
  phone: string | null
  role: "buyer" | "supplier" | "admin"
  organization_name: string | null
  organization_type: string | null
}

interface Supplier {
  id: string
  profile_id: string
  business_name: string
  contact_person: string | null
  position: string | null
  business_email: string | null
  business_phone: string | null
  kra_pin: string | null
  location: string | null
  business_address: string | null
  verification_status: "pending" | "verified" | "rejected"
  rating: number | null
  total_orders: number | null
  logo_url: string | null
}

interface UserContextType {
  user: User | null
  profile: Profile | null
  supplierProfile: Supplier | null // Add supplierProfile to context
  loading: boolean
  refresh: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [supplierProfile, setSupplierProfile] = useState<Supplier | null>(null) // State for supplier profile
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const refresh = async () => {
    try {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser()

      setUser(currentUser)

      if (currentUser) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single()

        if (profileError) {
          throw profileError
        }

        setProfile(profileData)

        if (profileData && profileData.role === "supplier") {
          const {
            data: supplierData, error: supplierError } = await supabase
            .from("suppliers")
            .select("*")
            .eq("profile_id", profileData.id)
            .single()

          if (supplierError) {
            throw supplierError
          }
          setSupplierProfile(supplierData)
        } else {
          setSupplierProfile(null)
        }
      } else {
        setProfile(null)
        setSupplierProfile(null)
      }
    } catch (error: any) {
      console.error("Error refreshing user:", error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        refresh()
      } else {
        setProfile(null)
        setSupplierProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <UserContext.Provider value={{ user, profile, supplierProfile, loading, refresh }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}


