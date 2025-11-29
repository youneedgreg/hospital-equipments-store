"use client"

import { useState, useEffect } from "react"
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
  phone_number: string | null
  address: string | null
}

interface UserData {
  user: {
    id: string
    email: string | null
    profile: UserProfile
  }
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
    // Here you would typically send updated profile data to an API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast({
      title: "Success",
      description: "Profile updated successfully!",
    })
  }

  if (loadingPage) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
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
  const firstName = fullName.split(" ")[0] || ""
  const lastName = fullName.split(" ").slice(1).join(" ") || ""

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
                      {fullName.charAt(0).toUpperCase() + (lastName ? lastName.charAt(0).toUpperCase() : "")}
                    </div>
                    <Button variant="outline">Change Photo</Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={firstName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={lastName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={user.profile.email || ""} readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={user.profile.phone_number || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role/Title</Label>
                      <Input id="role" defaultValue={user.profile.role || ""} readOnly />
                    </div>
                    {/* Assuming department is not in profile for now */}
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" defaultValue="Administration" />
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
                      <Input id="orgName" defaultValue="Nairobi Regional Hospital" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orgType">Organization Type</Label>
                      <Select defaultValue="hospital">
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
                      <Textarea id="address" defaultValue={user.profile.address || ""} rows={2} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue="Nairobi" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="county">County</Label>
                      <Input id="county" defaultValue="Nairobi" />
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
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSave} disabled={isLoading}>
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
                  {[
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
                  ].map((item) => (
                    <div key={item.id} className="flex items-start gap-4 p-4 rounded-lg border">
                      <input type="checkbox" id={item.id} defaultChecked className="mt-1" />
                      <div>
                        <Label htmlFor={item.id} className="font-medium">
                          {item.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}

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
