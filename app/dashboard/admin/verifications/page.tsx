"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardMobileNav } from "@/components/dashboard/dashboard-mobile-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Users,
  Package,
  ShoppingCart,
  Building2,
  ShieldCheck,
  BarChart3,
  Search,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  AlertTriangle,
} from "lucide-react"

const adminNavItems = [
  { href: "/dashboard/admin", label: "Overview", icon: "BarChart3" },
  { href: "/dashboard/admin/users", label: "Users", icon: "Users" },
  { href: "/dashboard/admin/suppliers", label: "Suppliers", icon: "Building2" },
  { href: "/dashboard/admin/products", label: "Products", icon: "Package" },
  { href: "/dashboard/admin/orders", label: "Orders", icon: "ShoppingCart" },
  { href: "/dashboard/admin/verifications", label: "Verifications", icon: "ShieldCheck" },
  { href: "/dashboard/admin/reports", label: "Reports", icon: "BarChart3" },
]

const pendingVerifications = [
  {
    id: 1,
    companyName: "MedEquip Kenya Ltd",
    email: "info@medequip.co.ke",
    phone: "+254 712 345 678",
    kraPin: "P051234567A",
    businessType: "Medical Equipment Distributor",
    submittedDate: "2024-01-14",
    documents: [
      { name: "KRA Certificate", type: "pdf", status: "uploaded" },
      { name: "Business Registration", type: "pdf", status: "uploaded" },
      { name: "PPB License", type: "pdf", status: "uploaded" },
      { name: "Director ID", type: "pdf", status: "uploaded" },
      { name: "Bank Statement", type: "pdf", status: "uploaded" },
    ],
  },
  {
    id: 2,
    companyName: "Kisumu Health Supplies",
    email: "contact@kisumuhealthsupplies.co.ke",
    phone: "+254 722 456 789",
    kraPin: "P051234568B",
    businessType: "Pharmaceutical Distributor",
    submittedDate: "2024-01-13",
    documents: [
      { name: "KRA Certificate", type: "pdf", status: "uploaded" },
      { name: "Business Registration", type: "pdf", status: "uploaded" },
      { name: "PPB License", type: "pdf", status: "pending" },
      { name: "Director ID", type: "pdf", status: "uploaded" },
    ],
  },
  {
    id: 3,
    companyName: "Coast Medical Distributors",
    email: "sales@coastmedical.co.ke",
    phone: "+254 733 567 890",
    kraPin: "P051234569C",
    businessType: "Medical Supplies Wholesaler",
    submittedDate: "2024-01-12",
    documents: [
      { name: "KRA Certificate", type: "pdf", status: "uploaded" },
      { name: "Business Registration", type: "pdf", status: "uploaded" },
      { name: "PPB License", type: "pdf", status: "uploaded" },
      { name: "Director ID", type: "pdf", status: "uploaded" },
      { name: "Bank Statement", type: "pdf", status: "uploaded" },
      { name: "Warehouse Certification", type: "pdf", status: "uploaded" },
    ],
  },
]

const approvedVerifications = [
  { id: 4, companyName: "MediSupply Kenya", approvedDate: "2024-01-10", verifiedBy: "Admin John" },
  { id: 5, companyName: "LabEquip Africa", approvedDate: "2024-01-08", verifiedBy: "Admin Gregory" },
  { id: 6, companyName: "PharmaCare Ltd", approvedDate: "2024-01-05", verifiedBy: "Admin John" },
]

const rejectedVerifications = [
  { id: 7, companyName: "Unknown Supplies", rejectedDate: "2024-01-11", reason: "Invalid KRA PIN" },
  { id: 8, companyName: "Fake Medical Co", rejectedDate: "2024-01-09", reason: "Fraudulent documents" },
]

export default function AdminVerificationsPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVerification, setSelectedVerification] = useState<(typeof pendingVerifications)[0] | null>(null)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")

  const handleApprove = () => {
    // Handle approval logic
    setReviewDialogOpen(false)
    setSelectedVerification(null)
  }

  const handleReject = () => {
    // Handle rejection logic
    setRejectDialogOpen(false)
    setReviewDialogOpen(false)
    setSelectedVerification(null)
    setRejectionReason("")
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar navItems={adminNavItems} userType="admin" />
      <DashboardMobileNav
        navItems={adminNavItems}
        userType="admin"
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <div className="flex-1 flex flex-col lg:pl-64">
        <DashboardHeader title="Supplier Verifications" userType="admin" onMenuClick={() => setMobileNavOpen(true)} />

        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4 flex items-center gap-3">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-yellow-800">Pending</p>
                  <p className="text-2xl font-bold text-yellow-900">{pendingVerifications.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-green-800">Approved</p>
                  <p className="text-2xl font-bold text-green-900">{approvedVerifications.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4 flex items-center gap-3">
                <XCircle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-sm text-red-800">Rejected</p>
                  <p className="text-2xl font-bold text-red-900">{rejectedVerifications.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Verified</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Verifications Tabs */}
          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList>
              <TabsTrigger value="pending" className="gap-2">
                <Clock className="h-4 w-4" />
                Pending ({pendingVerifications.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Approved
              </TabsTrigger>
              <TabsTrigger value="rejected" className="gap-2">
                <XCircle className="h-4 w-4" />
                Rejected
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Verifications</CardTitle>
                  <CardDescription>Review and approve supplier applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by company name..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="space-y-4">
                    {pendingVerifications
                      .filter((v) => v.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((verification) => (
                        <div
                          key={verification.id}
                          className="p-4 border rounded-lg hover:border-primary/50 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {verification.companyName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{verification.companyName}</h3>
                                <p className="text-sm text-muted-foreground">{verification.businessType}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  KRA: {verification.kraPin} · Submitted: {verification.submittedDate}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 text-sm text-muted-foreground mr-4">
                                <FileText className="h-4 w-4" />
                                {verification.documents.length} documents
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedVerification(verification)
                                  setReviewDialogOpen(true)
                                }}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Review
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="approved">
              <Card>
                <CardHeader>
                  <CardTitle>Approved Suppliers</CardTitle>
                  <CardDescription>Recently verified supplier accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {approvedVerifications.map((v) => (
                      <div
                        key={v.id}
                        className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">{v.companyName}</p>
                            <p className="text-xs text-muted-foreground">
                              Approved on {v.approvedDate} by {v.verifiedBy}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rejected">
              <Card>
                <CardHeader>
                  <CardTitle>Rejected Applications</CardTitle>
                  <CardDescription>Applications that did not meet verification requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rejectedVerifications.map((v) => (
                      <div
                        key={v.id}
                        className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100"
                      >
                        <div className="flex items-center gap-3">
                          <XCircle className="h-5 w-5 text-red-600" />
                          <div>
                            <p className="font-medium">{v.companyName}</p>
                            <p className="text-xs text-muted-foreground">Rejected on {v.rejectedDate}</p>
                            <p className="text-xs text-red-600 mt-1">Reason: {v.reason}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Verification</DialogTitle>
            <DialogDescription>Review supplier documents and information before approval</DialogDescription>
          </DialogHeader>

          {selectedVerification && (
            <div className="space-y-6">
              {/* Company Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Company Name</p>
                  <p className="font-medium">{selectedVerification.companyName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Business Type</p>
                  <p className="font-medium">{selectedVerification.businessType}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedVerification.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedVerification.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">KRA PIN</p>
                  <p className="font-medium">{selectedVerification.kraPin}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Submitted</p>
                  <p className="font-medium">{selectedVerification.submittedDate}</p>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h4 className="font-semibold mb-3">Submitted Documents</h4>
                <div className="space-y-2">
                  {selectedVerification.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground uppercase">{doc.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.status === "uploaded" ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Uploaded</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pending</Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning for incomplete docs */}
              {selectedVerification.documents.some((d) => d.status === "pending") && (
                <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">Incomplete Documentation</p>
                    <p className="text-sm text-yellow-700">
                      Some required documents are still pending. Consider requesting the supplier to upload missing
                      documents.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setRejectDialogOpen(true)}>
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Verification</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting this supplier application</DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter rejection reason..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectionReason.trim()}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
