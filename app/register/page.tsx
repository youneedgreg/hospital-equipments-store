"use client"

import { useState } from "react"
import Link from "next/link"
import { LogoIcon } from "@/components/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BuyerRegistrationForm } from "@/components/auth/buyer-registration-form"
import { SupplierRegistrationForm } from "@/components/auth/supplier-registration-form"

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState("buyer")

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <LogoIcon className="h-10 w-10" />
            <span className="text-2xl font-bold">BIOSYTEMS</span>
          </Link>

          <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
          <p className="mt-2 text-muted-foreground">Join Kenya's premier medical supplies marketplace</p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buyer">Buyer Account</TabsTrigger>
              <TabsTrigger value="supplier">Supplier Account</TabsTrigger>
            </TabsList>

            <TabsContent value="buyer" className="mt-6">
              <div className="mb-6 rounded-lg bg-secondary/10 p-4">
                <h3 className="font-medium text-secondary">For Healthcare Facilities</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Hospitals, clinics, pharmacies, NGOs, and individual buyers can source quality medical supplies from
                  verified suppliers.
                </p>
              </div>
              <BuyerRegistrationForm />
            </TabsContent>

            <TabsContent value="supplier" className="mt-6">
              <div className="mb-6 rounded-lg bg-primary/10 p-4">
                <h3 className="font-medium text-primary">For Medical Suppliers</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Reach thousands of healthcare facilities across Kenya. List your products and grow your business.
                </p>
              </div>
              <SupplierRegistrationForm />
            </TabsContent>
          </Tabs>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 to-secondary">
          <img
            src="/modern-medical-facility-equipment-warehouse.jpg"
            alt="Medical equipment warehouse"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-12 text-secondary-foreground">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold mb-4">Growing Together in Healthcare</h2>
            <p className="text-lg opacity-90">
              Whether you're a buyer or supplier, BIOSYTEMS connects you with the right partners for quality medical
              equipment and supplies.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 text-left">
              <div className="rounded-lg bg-white/10 p-4">
                <p className="font-semibold">Verified Suppliers</p>
                <p className="text-sm opacity-80">KRA PIN verification</p>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="font-semibold">Secure Payments</p>
                <p className="text-sm opacity-80">MPesa integration</p>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="font-semibold">Fast Delivery</p>
                <p className="text-sm opacity-80">Nationwide coverage</p>
              </div>
              <div className="rounded-lg bg-white/10 p-4">
                <p className="font-semibold">Quality Assured</p>
                <p className="text-sm opacity-80">Certified products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
