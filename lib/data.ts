export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image_url?: string;
  category_id: string;
  supplier_id?: string;
  in_stock: boolean;
  stock_count?: number;
  rating: number;
  review_count: number;
  specifications?: Record<string, string>;
  features?: string[];
  categories?: {
    id: string;
    name: string;
  };
  suppliers?: {
    id: string;
    business_name: string;
    rating: number;
    verification_status: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface LegacyProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  supplier: string;
  supplierRating: number;
  inStock: boolean;
  stockCount?: number;
  rating: number;
  reviewCount: number;
  specifications?: Record<string, string>;
  features?: string[];
}

export const categories = [
  { id: '1', name: 'Diagnostic Devices' },
  { id: '2', name: 'Therapeutic & Surgical Devices' },
  { id: '3', name: 'Implantable Devices' },
  { id: '4', name: 'Life Support & Critical Care Devices' },
  { id: '5', name: 'Disposables & Consumables' },
  { id: '6', name: 'Rehabilitation & Assistive Devices' },
  { id: '7', name: 'Hospital Furniture & Infrastructures' },
  { id: '8', name: 'Sterilization & Infection Control' },
  { id: '9', name: 'Dental Equipment' },
  { id: '10', name: 'Laboratory Equipment' },
  { id: '11', name: 'Home Care & Telehealth Devices' },
];

export const categoryDetails: { [key: string]: { image: string } } = {
  '1': { image: '/diagnostic-medical-tools-stethoscope.jpg' },
  '2': { image: '/surgical-instruments-medical-tools.jpg' },
  '3': { image: '/implantable-devices.jpg' }, // Placeholder for Implantable Devices
  '4': { image: '/patient-monitor-medical.jpg' }, // Example for Life Support
  '5': { image: '/medical-consumables-syringes-bandages.jpg' },
  '6': { image: '/wheelchair-mobility-aids-medical.jpg' },
  '7': { image: '/hospital-bed-medical-equipment.jpg' },
  '8': { image: '/infestation-control.jpg' }, // Placeholder for Sterilization
  '9': { image: '/dental-products.jpg' }, // Placeholder for Dental Equipment
  '10': { image: '/laboratory-equipment-medical-centrifuge.jpg' },
  '11': { image: '/home-care.png' }, // Placeholder for Home Care
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Hospital Bed',
    description: 'A hospital bed for patients.',
    price: 1200,
    category_id: '1',
    supplier_id: '1',
    in_stock: true,
    rating: 4.5,
    review_count: 10,
    image_url: '/hospital-bed-medical-equipment.jpg',
  },
  {
    id: '2',
    name: 'Syringes',
    description: 'A box of 100 syringes.',
    price: 50,
    category_id: '2',
    supplier_id: '2',
    in_stock: true,
    rating: 4.8,
    review_count: 25,
    image_url: '/medical-consumables-syringes-supplies.jpg',
  },
];

export const suppliers = [
    { id: '1', business_name: 'General Medical', rating: 4.5, verification_status: 'Verified' },
    { id: '2', business_name: 'Pharma Co.', rating: 4.2, verification_status: 'Verified' },
];

export const supplierDetails = [
    {
        id: '1',
        name: 'General Medical',
        coverImage: '/modern-medical-facility-equipment-warehouse.jpg', // Added a cover image
        logo: '/placeholder-logo.png',
        rating: 4.5,
        reviews: 120,
        location: 'Nairobi, Kenya',
        since: 2010,
        product_categories: ['Diagnostic Devices', 'Disposables & Consumables'],
        response_rate: 95,
        response_time: 'Within 24 hours',
        verified: true,
        verificationStatus: 'verified', // Added verification status
        productCount: 150, // Added product count
        totalOrders: 2500, // Added total orders
        description: "General Medical is a leading supplier of diagnostic devices and disposables & consumables in Kenya. We are committed to providing high-quality products and excellent customer service."
    },
    {
        id: '2',
        name: 'Pharma Co.',
        coverImage: '/healthcare-professionals-working-in-modern-hospita.jpg', // Added a cover image
        logo: '/healthcare-technology-company-logo-modern.jpg',
        rating: 4.2,
        reviews: 80,
        location: 'Mombasa, Kenya',
        since: 2015,
        product_categories: ['Disposables & Consumables', 'Diagnostic Devices'],
        response_rate: 90,
        response_time: 'Within 48 hours',
        verified: true,
        verificationStatus: 'verified',
        productCount: 80,
        totalOrders: 1800,
        description: "Pharma Co. specializes in disposables & consumables and diagnostic devices, serving clinics and pharmacies across the region with reliable and innovative solutions."
    },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
  }).format(price);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getSupplierById(id: string) {
  return supplierDetails.find((supplier) => supplier.id === id);
}
export function mapProductToLegacy(product: Product): LegacyProduct {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    originalPrice: product.original_price,
    image: product.image_url || '',
    category: product.categories?.name || '',
    supplier: product.suppliers?.business_name || '',
    supplierRating: product.suppliers?.rating || 0,
    inStock: product.in_stock,
    stockCount: product.stock_count,
    rating: product.rating,
    reviewCount: product.review_count,
    specifications: product.specifications,
    features: product.features,
  };
}