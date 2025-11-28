# BIOSYTEMS - Medical Supplies Marketplace

Kenya's premier online medical equipment and supplies marketplace connecting hospitals, clinics, pharmacies, NGOs, and individual buyers to verified suppliers.

## 🏥 Overview

BIOSYTEMS is a comprehensive e-commerce platform designed specifically for the medical supplies industry in Kenya. The platform facilitates seamless connections between healthcare facilities and verified medical equipment suppliers, ensuring quality, reliability, and trust in every transaction.

## ✨ Features

### For Buyers
- **Browse Products**: Explore a wide range of medical supplies across multiple categories
- **Product Search & Filters**: Find exactly what you need with advanced filtering options
- **Shopping Cart**: Add items to cart and manage your purchases
- **Order Management**: Track and manage your orders from purchase to delivery
- **Supplier Profiles**: View verified supplier information and ratings
- **Dashboard**: Access personalized dashboard with order history and account settings

### For Suppliers
- **Product Management**: List and manage your medical equipment inventory
- **Order Processing**: Receive and process orders from buyers
- **Inventory Management**: Track stock levels and manage inventory
- **Profile & KYC**: Complete verification process to build trust
- **Analytics Dashboard**: Monitor sales, orders, and business performance

### For Administrators
- **User Management**: Manage buyers, suppliers, and platform users
- **Supplier Verification**: Review and approve supplier KYC submissions
- **Product Moderation**: Oversee product listings and ensure quality
- **Order Monitoring**: Track all platform transactions
- **Reports & Analytics**: Access comprehensive platform analytics

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives with custom components
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Theme**: Dark/Light mode support with next-themes

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- npm, yarn, pnpm, or bun package manager

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd biosystems-ui-design
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
biosystems-ui-design/
├── app/                    # Next.js app router pages
│   ├── cart/              # Shopping cart page
│   ├── categories/        # Product categories pages
│   ├── checkout/          # Checkout and success pages
│   ├── dashboard/         # User dashboards
│   │   ├── admin/         # Admin dashboard
│   │   ├── buyer/         # Buyer dashboard
│   │   └── supplier/      # Supplier dashboard
│   ├── products/          # Product listing and detail pages
│   ├── suppliers/         # Supplier pages
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── auth/             # Authentication forms
│   ├── dashboard/        # Dashboard-specific components
│   ├── landing/          # Landing page sections
│   ├── products/         # Product-related components
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and contexts
│   ├── cart-context.tsx  # Shopping cart context
│   ├── data.ts           # Mock data
│   └── utils.ts          # Utility functions
├── hooks/                # Custom React hooks
├── public/               # Static assets
└── styles/               # Global styles
```

## 🎨 Key Pages & Routes

- `/` - Landing page with hero, categories, and features
- `/products` - Product listing page
- `/products/[id]` - Product detail page
- `/categories` - Browse by category
- `/categories/[id]` - Category-specific products
- `/suppliers` - Supplier listing
- `/suppliers/[id]` - Supplier profile
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/login` - User login
- `/register` - User registration (Buyer/Supplier)
- `/dashboard/buyer` - Buyer dashboard
- `/dashboard/supplier` - Supplier dashboard
- `/dashboard/admin` - Admin dashboard

## 🧩 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Product Categories

- Hospital Beds
- PPE & Safety Equipment
- Diagnostic Tools
- Surgical Instruments
- Laboratory Equipment
- Medical Consumables
- Mobility Aids
- Patient Monitoring Equipment

## 🔐 User Roles

### Buyer
Healthcare facilities, clinics, pharmacies, NGOs, and individual buyers who purchase medical supplies.

### Supplier
Verified medical equipment suppliers who list and sell products on the platform.

### Admin
Platform administrators who manage users, verify suppliers, and oversee operations.

## 🎨 Design System

The application uses a comprehensive design system built on:
- **Radix UI**: Accessible, unstyled component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality component library
- **Custom Components**: Tailored UI components for medical marketplace

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🌙 Theme Support

The application supports both light and dark themes with automatic system preference detection.

## 🔄 State Management

- **Cart State**: Managed via React Context (`CartProvider`)
- **Theme State**: Managed via `next-themes`
- **Form State**: Managed via React Hook Form

## 📦 Dependencies

### Core Dependencies
- `next` - React framework
- `react` & `react-dom` - UI library
- `typescript` - Type safety
- `tailwindcss` - Styling
- `lucide-react` - Icons

### UI & Forms
- `@radix-ui/*` - UI primitives
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `@hookform/resolvers` - Form validation resolvers

### Utilities
- `clsx` & `tailwind-merge` - Class name utilities
- `date-fns` - Date manipulation
- `recharts` - Data visualization

## 🚢 Deployment

The easiest way to deploy this Next.js application is using [Vercel](https://vercel.com):

1. Push your code to a Git repository
2. Import your project on Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

For more deployment options, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 📝 Development Notes

- The application currently uses mock data (`lib/data.ts`)
- Authentication is not yet implemented (UI only)
- Payment processing is not yet integrated
- Backend API integration is pending

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 📞 Support

For support and inquiries, please contact the development team.

---

Built with ❤️ for Kenya's healthcare community
