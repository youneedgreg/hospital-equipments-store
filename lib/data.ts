export const categories = [
  { id: "hospital-beds", name: "Hospital Beds", count: 245 },
  { id: "ppe-safety", name: "PPE & Safety", count: 520 },
  { id: "diagnostic-tools", name: "Diagnostic Tools", count: 380 },
  { id: "surgical-instruments", name: "Surgical Instruments", count: 890 },
  { id: "laboratory-equipment", name: "Laboratory Equipment", count: 310 },
  { id: "consumables", name: "Consumables", count: 1240 },
  { id: "mobility-aids", name: "Mobility Aids", count: 156 },
  { id: "patient-monitoring", name: "Patient Monitoring", count: 298 },
]

export const suppliers = [
  { id: "medsupply-kenya", name: "MedSupply Kenya Ltd", rating: 4.8, location: "Nairobi" },
  { id: "healthtech-africa", name: "HealthTech Africa", rating: 4.6, location: "Mombasa" },
  { id: "kenyan-medical", name: "Kenyan Medical Supplies", rating: 4.9, location: "Nairobi" },
  { id: "africare-equipment", name: "AfriCare Equipment", rating: 4.7, location: "Kisumu" },
  { id: "premier-healthcare", name: "Premier Healthcare", rating: 4.5, location: "Nakuru" },
]

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  supplier: string
  supplierRating: number
  inStock: boolean
  stockCount?: number
  rating: number
  reviewCount: number
  specifications?: Record<string, string>
  features?: string[]
}

export const products: Product[] = [
  {
    id: "1",
    name: "Electric Hospital Bed - ICU Grade",
    description:
      "Premium 5-function electric ICU hospital bed with full adjustment capabilities, side rails, and battery backup.",
    price: 285000,
    originalPrice: 320000,
    image: "/placeholder.svg?key=fxvhc",
    category: "Hospital Beds",
    supplier: "MedSupply Kenya Ltd",
    supplierRating: 4.8,
    inStock: true,
    stockCount: 12,
    rating: 4.9,
    reviewCount: 47,
    specifications: {
      Dimensions: "220cm x 100cm x 60-80cm",
      "Weight Capacity": "250kg",
      Material: "Stainless Steel Frame",
      Mattress: "Included (Medical Grade)",
      Power: "220V with Battery Backup",
      Warranty: "2 Years",
    },
    features: [
      "5-function electric adjustment",
      "CPR quick release",
      "Lockable castors",
      "Detachable head/footboard",
      "IV pole attachment points",
    ],
  },
  {
    id: "2",
    name: "N95 Respirator Masks - Box of 50",
    description:
      "NIOSH-certified N95 respirator masks for maximum protection against airborne particles and pathogens.",
    price: 4500,
    image: "/placeholder.svg?key=72oy0",
    category: "PPE & Safety",
    supplier: "HealthTech Africa",
    supplierRating: 4.6,
    inStock: true,
    stockCount: 500,
    rating: 4.7,
    reviewCount: 234,
    specifications: {
      Certification: "NIOSH N95",
      Filtration: "≥95%",
      Quantity: "50 masks/box",
      Size: "Universal Fit",
      "Shelf Life": "3 Years",
    },
  },
  {
    id: "3",
    name: "Digital Stethoscope - Bluetooth",
    description:
      "Advanced digital stethoscope with Bluetooth connectivity, noise cancellation, and mobile app integration.",
    price: 18500,
    originalPrice: 22000,
    image: "/placeholder.svg?key=ofttb",
    category: "Diagnostic Tools",
    supplier: "Kenyan Medical Supplies",
    supplierRating: 4.9,
    inStock: true,
    stockCount: 35,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: "4",
    name: "Surgical Instrument Set - General Surgery",
    description: "Complete 45-piece general surgery instrument set made from premium German stainless steel.",
    price: 125000,
    image: "/placeholder.svg?key=m8xhk",
    category: "Surgical Instruments",
    supplier: "MedSupply Kenya Ltd",
    supplierRating: 4.8,
    inStock: true,
    stockCount: 8,
    rating: 4.9,
    reviewCount: 28,
  },
  {
    id: "5",
    name: "Laboratory Centrifuge - 12 Place",
    description: "High-speed laboratory centrifuge with digital controls, timer, and safety lid lock.",
    price: 75000,
    image: "/placeholder.svg?key=ybm75",
    category: "Laboratory Equipment",
    supplier: "AfriCare Equipment",
    supplierRating: 4.7,
    inStock: true,
    stockCount: 5,
    rating: 4.6,
    reviewCount: 42,
  },
  {
    id: "6",
    name: "Disposable Syringes 5ml - Box of 100",
    description: "Sterile, single-use disposable syringes with attached needles. Latex-free.",
    price: 1200,
    image: "/placeholder.svg?key=9p29o",
    category: "Consumables",
    supplier: "HealthTech Africa",
    supplierRating: 4.6,
    inStock: true,
    stockCount: 1000,
    rating: 4.5,
    reviewCount: 567,
  },
  {
    id: "7",
    name: "Patient Monitor - 6 Parameter",
    description: "Multi-parameter patient monitor tracking ECG, SpO2, NIBP, temperature, respiration, and pulse.",
    price: 165000,
    originalPrice: 185000,
    image: "/placeholder.svg?key=t6eou",
    category: "Patient Monitoring",
    supplier: "Kenyan Medical Supplies",
    supplierRating: 4.9,
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviewCount: 63,
  },
  {
    id: "8",
    name: "Wheelchair - Foldable Standard",
    description: "Lightweight foldable wheelchair with removable footrests and comfortable cushioning.",
    price: 28000,
    image: "/placeholder.svg?key=3elz9",
    category: "Mobility Aids",
    supplier: "Premier Healthcare",
    supplierRating: 4.5,
    inStock: true,
    stockCount: 25,
    rating: 4.4,
    reviewCount: 112,
  },
  {
    id: "9",
    name: "Examination Gloves - Nitrile Box 100",
    description: "Powder-free nitrile examination gloves. Excellent tactile sensitivity and durability.",
    price: 1800,
    image: "/placeholder.svg?key=b4qlp",
    category: "PPE & Safety",
    supplier: "MedSupply Kenya Ltd",
    supplierRating: 4.8,
    inStock: true,
    stockCount: 800,
    rating: 4.6,
    reviewCount: 445,
  },
  {
    id: "10",
    name: "Pulse Oximeter - Fingertip",
    description: "Portable fingertip pulse oximeter with OLED display, SpO2, and pulse rate measurement.",
    price: 3500,
    image: "/placeholder.svg?key=dqnit",
    category: "Diagnostic Tools",
    supplier: "AfriCare Equipment",
    supplierRating: 4.7,
    inStock: false,
    rating: 4.7,
    reviewCount: 298,
  },
  {
    id: "11",
    name: "Blood Pressure Monitor - Digital",
    description: "Automatic digital blood pressure monitor with memory function and irregular heartbeat detection.",
    price: 5500,
    image: "/placeholder.svg?key=uxdqr",
    category: "Diagnostic Tools",
    supplier: "HealthTech Africa",
    supplierRating: 4.6,
    inStock: true,
    stockCount: 50,
    rating: 4.5,
    reviewCount: 189,
  },
  {
    id: "12",
    name: "Surgical Gowns - Sterile Pack of 10",
    description: "Disposable sterile surgical gowns with reinforced sleeves. AAMI Level 3 protection.",
    price: 3200,
    image: "/placeholder.svg?key=x95j1",
    category: "PPE & Safety",
    supplier: "Premier Healthcare",
    supplierRating: 4.5,
    inStock: true,
    stockCount: 200,
    rating: 4.4,
    reviewCount: 156,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function formatPrice(price: number): string {
  return `KSh ${price.toLocaleString()}`
}

// Helper functions for categories and suppliers
export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.id === slug)
}

export function getSupplierById(id: string): SupplierDetail | undefined {
  return supplierDetails.find((s) => s.id === id)
}

export function getProductsByCategory(categoryName: string): Product[] {
  return products.filter((p) => p.category === categoryName)
}

export function getProductsBySupplier(supplierName: string): Product[] {
  return products.filter((p) => p.supplier === supplierName)
}

// Category icons/images mapping
export const categoryDetails: Record<string, { icon: string; description: string; image: string }> = {
  "hospital-beds": {
    icon: "🛏️",
    description:
      "Premium hospital beds including ICU, electric, manual, and specialty care beds for all healthcare settings.",
    image: "/hospital-beds-medical-equipment.jpg",
  },
  "ppe-safety": {
    icon: "🦺",
    description:
      "Personal protective equipment including masks, gloves, gowns, and safety gear for healthcare professionals.",
    image: "/ppe-medical-safety-equipment-masks-gloves.jpg",
  },
  "diagnostic-tools": {
    icon: "🩺",
    description:
      "Diagnostic instruments including stethoscopes, blood pressure monitors, thermometers, and examination tools.",
    image: "/diagnostic-medical-tools-stethoscope.jpg",
  },
  "surgical-instruments": {
    icon: "✂️",
    description: "Precision surgical instruments and tools for all surgical procedures and specialties.",
    image: "/surgical-instruments-medical-tools.jpg",
  },
  "laboratory-equipment": {
    icon: "🔬",
    description: "Laboratory equipment including centrifuges, microscopes, analyzers, and testing supplies.",
    image: "/laboratory-equipment-medical-centrifuge.jpg",
  },
  consumables: {
    icon: "💉",
    description: "Medical consumables including syringes, bandages, IV supplies, and disposable items.",
    image: "/medical-consumables-syringes-supplies.jpg",
  },
  "mobility-aids": {
    icon: "♿",
    description: "Mobility aids including wheelchairs, walkers, crutches, and rehabilitation equipment.",
    image: "/wheelchair-mobility-aids-medical.jpg",
  },
  "patient-monitoring": {
    icon: "📊",
    description: "Patient monitoring systems including vital signs monitors, ECG machines, and telemetry equipment.",
    image: "/patient-monitor-medical-vital-signs.jpg",
  },
}

// Extended supplier data with more details
export interface SupplierDetail {
  id: string
  name: string
  rating: number
  location: string
  description: string
  yearEstablished: number
  productCount: number
  totalOrders: number
  responseTime: string
  verificationStatus: "verified" | "pending"
  logo: string
  coverImage: string
  categories: string[]
  contactEmail: string
  contactPhone: string
}

export const supplierDetails: SupplierDetail[] = [
  {
    id: "medsupply-kenya",
    name: "MedSupply Kenya Ltd",
    rating: 4.8,
    location: "Nairobi, Kenya",
    description:
      "Leading medical equipment supplier in East Africa with over 15 years of experience. We specialize in hospital beds, diagnostic equipment, and surgical instruments. Trusted by over 200 healthcare facilities across Kenya.",
    yearEstablished: 2008,
    productCount: 245,
    totalOrders: 3420,
    responseTime: "< 2 hours",
    verificationStatus: "verified",
    logo: "/medical-supply-logo.jpg",
    coverImage: "/medical-warehouse.jpg",
    categories: ["Hospital Beds", "Surgical Instruments", "Diagnostic Tools"],
    contactEmail: "sales@medsupply-kenya.co.ke",
    contactPhone: "+254 700 123 456",
  },
  {
    id: "healthtech-africa",
    name: "HealthTech Africa",
    rating: 4.6,
    location: "Mombasa, Kenya",
    description:
      "Your trusted partner for PPE and safety equipment. We import high-quality protective gear and consumables directly from certified manufacturers. Serving healthcare facilities, NGOs, and government institutions.",
    yearEstablished: 2012,
    productCount: 520,
    totalOrders: 5890,
    responseTime: "< 3 hours",
    verificationStatus: "verified",
    logo: "/healthcare-technology-logo.jpg",
    coverImage: "/placeholder.svg?height=400&width=1200",
    categories: ["PPE & Safety", "Consumables"],
    contactEmail: "info@healthtech-africa.com",
    contactPhone: "+254 722 345 678",
  },
  {
    id: "kenyan-medical",
    name: "Kenyan Medical Supplies",
    rating: 4.9,
    location: "Nairobi, Kenya",
    description:
      "Premium medical equipment supplier with the highest customer satisfaction ratings. We offer the latest diagnostic tools and patient monitoring systems with comprehensive after-sales support and training.",
    yearEstablished: 2005,
    productCount: 380,
    totalOrders: 4120,
    responseTime: "< 1 hour",
    verificationStatus: "verified",
    logo: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=400&width=1200",
    categories: ["Diagnostic Tools", "Patient Monitoring"],
    contactEmail: "contact@kenyanmedical.co.ke",
    contactPhone: "+254 733 456 789",
  },
  {
    id: "africare-equipment",
    name: "AfriCare Equipment",
    rating: 4.7,
    location: "Kisumu, Kenya",
    description:
      "Specialized supplier of laboratory equipment and diagnostic instruments. We serve research institutions, hospitals, and private clinics with cutting-edge equipment and reliable technical support.",
    yearEstablished: 2010,
    productCount: 310,
    totalOrders: 2340,
    responseTime: "< 4 hours",
    verificationStatus: "verified",
    logo: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=400&width=1200",
    categories: ["Laboratory Equipment", "Diagnostic Tools"],
    contactEmail: "sales@africare-equipment.com",
    contactPhone: "+254 744 567 890",
  },
  {
    id: "premier-healthcare",
    name: "Premier Healthcare",
    rating: 4.5,
    location: "Nakuru, Kenya",
    description:
      "Comprehensive supplier of mobility aids, PPE, and general medical consumables. We focus on affordability without compromising quality, making healthcare accessible to all facilities.",
    yearEstablished: 2015,
    productCount: 298,
    totalOrders: 1890,
    responseTime: "< 6 hours",
    verificationStatus: "verified",
    logo: "/placeholder.svg?height=120&width=120",
    coverImage: "/placeholder.svg?height=400&width=1200",
    categories: ["Mobility Aids", "PPE & Safety", "Consumables"],
    contactEmail: "info@premier-healthcare.co.ke",
    contactPhone: "+254 755 678 901",
  },
]
