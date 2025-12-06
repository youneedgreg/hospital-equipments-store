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

export function getSupplierById(id: string) {
  return supplierDetails.find((supplier) => supplier.id === id);
}