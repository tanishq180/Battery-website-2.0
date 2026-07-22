# Import/Export Business Web Application - Frontend

Full-Stack Next.js 14 (App Router) Enterprise Web Application styled with Tailwind CSS, Lucide-React icons, TypeScript, JWT authentication, and comprehensive administrative lead management.

---

## 📁 Project Architecture & Directory Layout

```text
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Global Root Layout with AuthProvider
│   │   ├── page.tsx              # Homepage Landing Page
│   │   ├── about/
│   │   │   └── page.tsx          # About Us Enterprise Page
│   │   ├── contact/
│   │   │   └── page.tsx          # Standalone Contact Us & Inquiry Page
│   │   ├── products/
│   │   │   ├── page.tsx          # Interactive Product Catalog Grid Page
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Dynamic Product Detail Page (Price Calculator & Quote Form)
│   │   └── admin/
│   │       ├── login/
│   │       │   └── page.tsx      # Admin Authentication Page
│   │       ├── dashboard/
│   │       │   └── page.tsx      # Executive Dashboard (Inventory & Lead Metrics)
│   │       ├── products/
│   │       │   ├── page.tsx      # Admin Product Catalog Management Table
│   │       │   ├── new/
│   │       │   │   └── page.tsx  # Add Product Page
│   │       │   └── [id]/
│   │       │       └── page.tsx  # Edit Product & Dynamic Price Tiers Page
│   │       └── enquiries/
│   │           └── page.tsx      # Enquiry Lead Hub (Tabbed Views & Log Notes)
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminSidebar.tsx  # Navigation drawer for admin pages
│   │   │   ├── ProductForm.tsx   # Dynamic Product + Dynamic Price Tier Builder
│   │   │   ├── EnquiryTable.tsx  # Tabbed Enquiry List & Quick Status Toggles
│   │   │   └── EnquiryDetailModal.tsx # Lead Modal with Internal Log Notes Editor
│   │   ├── forms/
│   │   │   ├── QuoteForm.tsx     # Interactive RFQ Form with client-side validation
│   │   │   └── FormInput.tsx     # Reusable form field wrapper with validation styling
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # Global header navigation
│   │   │   ├── Footer.tsx        # Global footer with WhatsApp CTA, contact, and legal links
│   │   │   └── MobileMenu.tsx    # Slide-out drawer navigation for mobile
│   │   ├── products/
│   │   │   ├── ProductCard.tsx   # Catalog item card with image fallback & starting price
│   │   │   ├── ProductFilters.tsx# Debounced search bar & category pill selectors
│   │   │   ├── PriceTierTable.tsx# Tabular volume price break breakdown
│   │   │   └── PriceCalculator.tsx# Interactive quantity calculator & WhatsApp chat CTA
│   │   └── ui/                   # Reusable UI primitives
│   │       ├── Button.tsx        # Variant-driven Button component
│   │       ├── Card.tsx          # Reusable Card container & sub-components
│   │       └── Toast.tsx         # Notification toast alert modal
│   ├── context/
│   │   └── AuthContext.tsx       # JWT Storage & Authentication Context Provider
│   ├── services/
│   │   ├── api.ts                # Public API client
│   │   └── adminApi.ts           # Authenticated Admin API client (Bearer Token)
│   ├── types/
│   │   ├── index.ts              # Global TypeScript interfaces
│   │   ├── product.ts            # Product, PriceTier, and Enquiry model definitions
│   │   └── enquiry.ts            # Enquiry form data & response models
│   └── middleware.ts             # Next.js Middleware route guard for /admin/* paths
├── .env.local                    # Environment configuration
├── .env.local.example
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind theme & corporate color palette
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Application Routes:
- **Public Homepage**: `http://localhost:3000`
- **About Us Page**: `http://localhost:3000/about`
- **Product Catalog**: `http://localhost:3000/products`
- **Product Detail & Price Calculator**: `http://localhost:3000/products/1`
- **Contact Us & RFQ Form**: `http://localhost:3000/contact`
- **Admin Portal Login**: `http://localhost:3000/admin/login` (Seed Credentials: `admin@company.com` / `AdminPassword123!`)
- **Admin Dashboard**: `http://localhost:3000/admin/dashboard`
- **Admin Products Manager**: `http://localhost:3000/admin/products`
- **Admin Lead Management Hub**: `http://localhost:3000/admin/enquiries`

### 4. Build for Production
```bash
npm run build
npm run start
```
