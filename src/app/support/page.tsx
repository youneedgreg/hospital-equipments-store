"use client"

import type React from "react"

import { useState } from "react"
import {
  MessageSquare,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  FileText,
  Video,
  Download,
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"


// Mock FAQ data
const faqs = [
  {
    id: 1,
    question: "How do I track my order?",
    answer:
      "You can track your order by visiting the 'My Orders' section in your account or by using the tracking number provided in your order confirmation email. Our system provides real-time updates on your order status.",
    category: "Orders",
  },
  {
    id: 2,
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most medical equipment. Items must be in original condition and packaging. Some specialized equipment may have different return terms due to safety regulations.",
    category: "Returns",
  },
  {
    id: 3,
    question: "Do you offer bulk discounts for hospitals?",
    answer:
      "Yes, we offer volume discounts for healthcare institutions. Contact our sales team for custom pricing on bulk orders. We also provide dedicated account management for large organizations.",
    category: "Pricing",
  },
  {
    id: 4,
    question: "Are your products FDA approved?",
    answer:
      "All our medical equipment meets FDA requirements and industry standards. Each product page includes certification information and compliance details.",
    category: "Compliance",
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, PayPal, wire transfers, and purchase orders from qualified institutions. Net 30 terms are available for established healthcare organizations.",
    category: "Payment",
  },
]

const supportChannels = [
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Get instant help from our support team",
    availability: "24/7",
    action: "Start Chat",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with a support specialist",
    availability: "Mon-Fri 8AM-8PM EST",
    action: "Call Now",
    contact: "+1 (800) 555-MEDIC",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us a detailed message",
    availability: "Response within 24 hours",
    action: "Send Email",
    contact: "support@medequippro.com",
  },
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [openFaqs, setOpenFaqs] = useState<number[]>([])
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })

  const toggleFaq = (id: number) => {
    setOpenFaqs((prev) => (prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id]))
  }

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", contactForm)
    alert("Thank you for contacting us! We'll get back to you within 24 hours.")
    setContactForm({ name: "", email: "", subject: "", category: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-background">


      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">How Can We Help You?</h1>
            <p className="text-xl text-muted-foreground mb-8">Get support for your medical equipment needs</p>

            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search for help articles, FAQs, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg"
                />
              </div>
            </div>
          </div>

          {/* Support Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {supportChannels.map((channel, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <channel.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{channel.title}</CardTitle>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{channel.availability}</span>
                  </div>
                  {channel.contact && <p className="text-sm font-medium text-foreground">{channel.contact}</p>}
                  <Button className="w-full">{channel.action}</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* FAQ Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="orders">Orders</SelectItem>
                    <SelectItem value="returns">Returns</SelectItem>
                    <SelectItem value="pricing">Pricing</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <Card key={faq.id}>
                    <Collapsible open={openFaqs.includes(faq.id)} onOpenChange={() => toggleFaq(faq.id)}>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary" className="text-xs">
                                {faq.category}
                              </Badge>
                              <CardTitle className="text-base text-left">{faq.question}</CardTitle>
                            </div>
                            {openFaqs.includes(faq.id) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>

              {filteredFaqs.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No FAQs found matching your search.</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Us</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>
                    Can't find what you're looking for? Send us a detailed message and we'll get back to you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={contactForm.category}
                        onValueChange={(value) => setContactForm({ ...contactForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="returns">Returns & Exchanges</SelectItem>
                          <SelectItem value="bulk">Bulk Orders</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Please provide as much detail as possible..."
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Additional Resources */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Additional Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    User Manuals & Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Video className="w-4 h-4 mr-2" />
                    Video Tutorials
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Software Downloads
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
