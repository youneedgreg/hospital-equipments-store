"use client"

import { useState, useEffect } from "react"
import { changePassword } from "@/lib/actions/auth"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Save, User, ShoppingCart, MessageSquare, Settings } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/components/ui/use-toast"

interface UserProfile {
  id: string
  full_name: string | null
  email: string | null
  role: string | null
  phone: string | null
  address?: string | null
  organization_name?: string | null
  organization_type?: string | null
}

interface UserData {
  user: {
    id: string
    email: string | null
    profile: UserProfile
  }
  orders?: any[]
}

const buyerNavItems = [
  { href: "/dashboard/buyer", label: "Dashboard", icon: "User" },
  { href: "/dashboard/buyer/orders", label: "My Orders", icon: "ShoppingCart" },
  { href: "/dashboard/buyer/profile", label: "Profile", icon: "Settings" },
  { href: "/dashboard/buyer/support", label: "Support", icon: "MessageSquare" },
]

export default function BuyerProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingPage, setLoadingPage] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // controlled form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [role, setRole] = useState("")
  const [department, setDepartment] = useState("Administration")
  const [orgName, setOrgName] = useState("")
  const [orgType, setOrgType] = useState("hospital")
  const [city, setCity] = useState("Nairobi")
  const [county, setCounty] = useState("Nairobi")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user")
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch user data")
        }
        const data: UserData = await response.json()
        setUserData(data)

        // map DB fields -> form fields (guard null => "")
        const profile = data.user.profile || ({} as UserProfile)
        const fullName = profile.full_name || ""
        const names = fullName.trim().split(" ")
        setFirstName(names[0] || "")
        setLastName(names.slice(1).join(" ") || "")
        setPhone(profile.phone || "")
        setAddress((profile as any).address || "")
        setRole(profile.role || "")
        setOrgName((profile as any).organization_name || "")
        setOrgType((profile as any).organization_type || "hospital")
        // keep city/county defaults if not present
        setCity((profile as any).city || "Nairobi")
        setCounty((profile as any).county || "Nairobi")
      } catch (err: any) {
        setError(err.message)
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        })
      } finally {
        setLoadingPage(false)
      }
    }

    fetchUserData()
  }, [toast])

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const payload = {
        full_name: `${firstName} ${lastName}`.trim(),
        phone: phone || null,
        address: address || null,
        organization_name: orgName || null,
        organization_type: orgType || null,
        city: city || null,
        county: county || null,
        department: department || null,
      }

      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to update profile")
      }

      const updated = await res.json()
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      })

      // Update local state userData.profile to reflect changes
      setUserData((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          user: { ...prev.user, profile: { ...prev.user.profile, ...updated.profile } },
        }
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      })
      return
    }
    setIsLoading(true)
    try {
      const result = await changePassword(currentPassword, newPassword)
      if (result?.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Password updated successfully!",
        })
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (loadingPage) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner width="lg" height="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        <p>Error: {error}</p>
      </div>
    )
  }

  const { user } = userData || { user: null }

  if (!user || !user.profile) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        <p>User data not found. Please log in again.</p>
      </div>
    )
  }

  const fullName = user.profile.full_name || ""
  const initials =
    fullName
      .split(" ")
      .map((s) => (s ? s.charAt(0).toUpperCase() : ""))
      .slice(0, 2)
      .join("") || "B"

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar navItems={buyerNavItems} userType="buyer" />
      <div className="flex-1 lg:pl-64">
        <DashboardHeader userType="buyer" userName={user.profile.full_name || "Buyer"} />

        <main className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Profile & Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="max-w-3xl">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="organization">Organization</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold mb-6">Personal Information</h2>

                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                      {initials}
                    </div>
                    <Button variant="outline">Change Photo</Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" value={user.profile.email || ""} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role/Title</Label>
                      <Input id="role" value={role || ""} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                    </div>
                  </div>

                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="organization" className="mt-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold mb-6">Organization Details</h2>

                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="orgName">Organization Name</Label>
                      <Input id="orgName" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orgType">Organization Type</Label>
                      <Select value={orgType} onValueChange={(val) => setOrgType(val)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hospital">Hospital</SelectItem>
                          <SelectItem value="clinic">Clinic</SelectItem>
                          <SelectItem value="pharmacy">Pharmacy</SelectItem>
                          <SelectItem value="ngo">NGO</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows={2} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="county">County</Label>
                      <Input id="county" value={county} onChange={(e) => setCounty(e.target.value)} />
                    </div>
                  </div>

                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold mb-6">Security Settings</h2>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Change Password</h3>
                    <div className="grid gap-4 max-w-md">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleChangePassword} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update Password
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold mb-6">Notification Preferences</h2>

                <div className="space-y-4">
                  {[ ...Array(4).keys() ].map((i) => {
                    const items = [
                      {
                        id: "orderUpdates",
                        label: "Order Updates",
                        description: "Get notified about order status changes",
                      },
                      { id: "promotions", label: "Promotions", description: "Receive promotional offers and discounts" },
                      {
                        id: "newProducts",
                        label: "New Products",
                        description: "Be notified when new products are added",
                      },
                      { id: "newsletter", label: "Newsletter", description: "Weekly digest of medical equipment news" },
                    ]
                    const item = items[i]
                    return (
                      <div key={item.id} className="flex items-start gap-4 p-4 rounded-lg border">
                        <input type="checkbox" id={item.id} defaultChecked className="mt-1" />
                        <div>
                          <Label htmlFor={item.id} className="font-medium">
                            {item.label}
                          </Label>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    )
                  })}
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
