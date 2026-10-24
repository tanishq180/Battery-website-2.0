import { batteryCategories, batteryRanges } from "@/data/batteryCatalog";
import { Category, Product, ProductListResponse, EnquiryCreate, EnquiryResponse } from "@/types/product";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/categories`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch (error) {
    console.error("fetchCategories error:", error);
    return batteryCategories;
  }
}

export async function fetchProducts(
  search?: string,
  categorySlug?: string,
  page: number = 1,
  size: number = 12
): Promise<ProductListResponse> {
  try {
    const params = new URLSearchParams();
    if (search && search.trim()) params.append("search", search.trim());
    if (categorySlug && categorySlug.trim()) params.append("category_slug", categorySlug.trim());
    params.append("page", page.toString());
    params.append("size", size.toString());

    const url = `${API_BASE_URL}/api/v1/products?${params.toString()}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (error) {
    console.error("fetchProducts error:", error);
    const query = search?.trim().toLowerCase() || "";
    const filtered = batteryRanges.filter(p => (!categorySlug || p.category?.slug === categorySlug) && (!query || `${p.title} ${p.description} ${p.use_cases?.join(" ")}`.toLowerCase().includes(query)));
    return { items: filtered.slice((page - 1) * size, page * size), total: filtered.length, page, size, is_demo: true };
  }
}

export async function fetchProductById(id: string | number): Promise<Product | null> {
  if (Number(id) < 0) return batteryRanges.find(p => p.id === Number(id)) || null;
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/products/${id}`, { cache: "no-store" });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch product ${id}`);
    }
    return await res.json();
  } catch (error) {
    console.error(`fetchProductById error (${id}):`, error);
    return null;
  }
}

export async function submitEnquiry(data: EnquiryCreate): Promise<EnquiryResponse> {
  const res = await fetch(`${API_BASE_URL}/api/v1/enquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Failed to submit quote inquiry");
  }

  return await res.json();
}
