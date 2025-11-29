"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Loader2, Save, CheckCircle, Upload } from "lucide-react"

export default function SupplierProfilePage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar type="supplier" navItems={[]} />
      <div className="flex-1 lg:pl-64">
        <DashboardHeader type="supplier" userName="MedSupply Kenya" />

        <main className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Profile & KYC</h1>
            <p className="text-muted-foreground mt-1">Manage your business profile and verification documents</p>
          </div>

          <Tabs defaultValue="business" className="max-w-3xl">
            <TabsList>
              <TabsTrigger value="business">Business Info</TabsTrigger>
              <TabsTrigger value="kyc">KYC Verification</TabsTrigger>
              <TabsTrigger value="banking">Banking</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="business" className="mt-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold mb-6">Business Information</h2>

                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 rounded-lg bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                      MK
                    </div>
                    <Button variant="outline">Change Logo</Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input id="businessName" defaultValue="MedSupply Kenya Ltd" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kraPin">KRA PIN</Label>
                      <Input id="kraPin" defaultValue="A000000000A" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Person</Label>
                      <Input id="contactName" defaultValue="Grace Muthoni" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input id="position" defaultValue="Managing Director" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Business Email</Label>
                      <Input id="email" type="email" defaultValue="contact@medsupply.co.ke" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Business Phone</Label>
                      <Input id="phone" defaultValue="+254 720 123 456" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Business Address</Label>
                      <Textarea id="address" defaultValue="Industrial Area, Enterprise Road, Nairobi" rows={2} />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="description">Business Description</Label>
                      <Textarea
                        id="description"
                        defaultValue="Leading supplier of medical equipment and supplies in Kenya, serving hospitals, clinics, and healthcare facilities since 2015."
                        rows={3}
                      />
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

            <TabsContent value="kyc" className="mt-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">KYC Verification</h2>
                  <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>

                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-secondary/10">
                    <p className="text-sm text-secondary font-medium">
                      Your business has been verified. All documents are up to date.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Uploaded Documents</h3>

                    {[
                      { name: "KRA PIN Certificate", status: "verified", date: "Uploaded Nov 1, 2024" },
                      { name: "Business Registration Certificate", status: "verified", date: "Uploaded Nov 1, 2024" },
                      { name: "Director ID/Passport", status: "verified", date: "Uploaded Nov 1, 2024" },
                    ].map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">{doc.date}</p>
                        </div>
                        <Badge variant="outline" className="bg-secondary/20 text-secondary border-secondary/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Need to update a document? Drag and drop or click to upload
                    </p>
                    <Button variant="outline" className="mt-3 bg-transparent">
                      Upload Document
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="banking" className="mt-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold mb-6">Banking Details</h2>

                <div className="space-y-6">
                  <p className="text-sm text-muted-foreground">
                    Add your bank details for receiving payments from orders.
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input id="bankName" defaultValue="Equity Bank Kenya" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branchName">Branch</Label>
                      <Input id="branchName" defaultValue="Industrial Area" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountName">Account Name</Label>
                      <Input id="accountName" defaultValue="MedSupply Kenya Ltd" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input id="accountNumber" defaultValue="0123456789012" />
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">MPesa Business Number</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="tillNumber">Till/Paybill Number</Label>
                        <Input id="tillNumber" defaultValue="123456" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mpesaName">Registered Name</Label>
                        <Input id="mpesaName" defaultValue="MedSupply Kenya" />
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    Save Banking Details
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
          </Tabs>
        </main>
      </div>
    </div>
  )
}
