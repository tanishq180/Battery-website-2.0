export interface EnquiryFormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_id?: number | null;
  target_quantity: number;
  message?: string | null;
}

export interface EnquiryResponse extends EnquiryFormData {
  id: number;
  status: string;
  created_at: string;
  whatsapp_url?: string | null;
}
