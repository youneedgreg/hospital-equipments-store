import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageCircle, Phone, Mail, FileQuestion, ChevronRight } from "lucide-react"

const faqs = [
  {
    question: "How do I add a new product?",
    answer: "Go to 'My Products' and click 'Add Product'. Fill in the required details and submit.",
  },
  {
    question: "When do I receive payment?",
    answer: "Payments are processed within 24-48 hours after order delivery confirmation.",
  },
  {
    question: "How do I update my inventory?",
    answer: "Use the 'Inventory' page to update stock levels for all your products.",
  },
  {
    question: "What if a buyer cancels an order?",
    answer: "Cancelled orders are automatically handled. Contact support if you've already shipped.",
  },
]

export default function SupplierSupportPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar type="supplier" navItems={[]} />
      <div className="flex-1 lg:pl-64">
        <DashboardHeader type="supplier" userName="MedSupply Kenya" />

        <main className="p-4 lg:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Support</h1>
            <p className="text-muted-foreground mt-1">Get help with your supplier account</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Contact Options */}
            <div className="lg:col-span-1 space-y-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
                <div className="space-y-4">
                  <a
                    href="tel:+254700000000"
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Supplier Hotline</p>
                      <p className="text-sm text-muted-foreground">+254 700 000 001</p>
                    </div>
                  </a>
                  <a
                    href="mailto:suppliers@biosytems.co.ke"
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">suppliers@biosytems.co.ke</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-muted-foreground">Available 8AM - 6PM EAT</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold mb-4">FAQs</h2>
                <div className="space-y-2">
                  {faqs.map((faq, index) => (
                    <details key={index} className="group">
                      <summary className="flex cursor-pointer items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                        <span className="font-medium text-sm">{faq.question}</span>
                        <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                      </summary>
                      <p className="px-3 pb-3 text-sm text-muted-foreground">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* Support Form */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold mb-6">Submit a Support Request</h2>

                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" defaultValue="Grace Muthoni" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="contact@medsupply.co.ke" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Brief description of your issue" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderId">Related Order ID (Optional)</Label>
                    <Input id="orderId" placeholder="BIO-XXXXXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Describe your issue in detail..." rows={5} />
                  </div>
                  <div className="space-y-2">
                    <Label>Attachments (Optional)</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <FileQuestion className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Drag and drop files here, or click to browse</p>
                    </div>
                  </div>
                  <Button type="submit">Submit Request</Button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
