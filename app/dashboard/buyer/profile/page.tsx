"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Save } from "lucide-react"

export default function BuyerProfilePage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar type="buyer" />
      <div className="flex-1 lg:pl-64">
        <DashboardHeader type="buyer" userName="Dr. Sarah Wanjiku" />

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
                      SW
                    </div>
                    <Button variant="outline">Change Photo</Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Sarah" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Wanjiku" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="sarah.wanjiku@hospital.co.ke" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+254 712 345 678" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role/Title</Label>
                      <Input id="role" defaultValue="Chief Medical Officer" />
                    </div>
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
                      <Textarea id="address" defaultValue="Kenyatta Avenue, Nairobi" rows={2} />
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
