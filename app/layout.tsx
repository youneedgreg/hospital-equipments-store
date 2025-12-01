import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import { UserProvider } from "@/lib/user-context"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BIOSYTEMS - Trusted Medical Supplies, Delivered",
  description:
    "Kenya's premier online medical equipment and supplies marketplace connecting hospitals, clinics, pharmacies, NGOs, and individual buyers to verified suppliers.",
  generator: "v0.app",
}

import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <UserProvider>
          <CartProvider>{children}</CartProvider>
        </UserProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
