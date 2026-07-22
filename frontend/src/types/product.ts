export interface PriceTier {
  id: number;
  min_quantity: number;
  max_quantity?: number | null;
  unit_price: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  use_cases?: string[] | null;
  image_url?: string | null;
  category_id?: number | null;
  created_at: string;
  category?: Category | null;
  price_tiers: PriceTier[];
}

export interface ProductListResponse {
  items: Product[];
  total: number;
  page: number;
  size: number;
}

export interface EnquiryFormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_id?: number | null;
  target_quantity: number;
  message?: string | null;
}

export type EnquiryCreate = EnquiryFormData;

export interface EnquiryResponse extends EnquiryFormData {
  id: number;
  status: string;
  created_at: string;
  whatsapp_url?: string | null;
}

export interface Enquiry {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_id?: number | null;
  target_quantity: number;
  message?: string | null;
  status: "Received" | "Attended" | string;
  internal_notes?: string | null;
  created_at: string;
  whatsapp_url?: string | null;
  product?: Product | null;
}
