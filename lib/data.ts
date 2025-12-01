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
  { id: '1', name: 'Medical Equipment' },
  { id: '2', name: 'Medical Supplies' },
  { id: '3', name: 'Diagnostics' },
  { id: '4', name: 'PPE' },
  { id: '5', name: 'Mobility' },
  { id: '6', name: 'Consumables' },
];

export const categoryDetails: { [key: string]: { image: string } } = {
  '1': { image: '/hospital-bed-medical-equipment.jpg' },
  '2': { image: '/medical-consumables-syringes-supplies.jpg' },
  '3': { image: '/diagnostic-medical-tools-stethoscope.jpg' },
  '4': { image: '/medical-ppe-masks-gloves-safety-equipment.jpg' },
  '5': { image: '/wheelchair-mobility-aids-medical.jpg' },
  '6': { image: '/medical-consumables-syringes-bandages.jpg' },
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
        product_categories: ['Medical Equipment', 'Consumables'],
        response_rate: 95,
        response_time: 'Within 24 hours',
        verified: true,
        verificationStatus: 'verified', // Added verification status
        productCount: 150, // Added product count
        totalOrders: 2500, // Added total orders
        description: "General Medical is a leading supplier of medical equipment and consumables in Kenya. We are committed to providing high-quality products and excellent customer service."
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
        product_categories: ['Medical Supplies', 'Diagnostics'],
        response_rate: 90,
        response_time: 'Within 48 hours',
        verified: true,
        verificationStatus: 'verified',
        productCount: 80,
        totalOrders: 1800,
        description: "Pharma Co. specializes in pharmaceutical products and diagnostic tools, serving clinics and pharmacies across the region with reliable and innovative solutions."
    },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
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