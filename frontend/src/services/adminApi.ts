const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function loginAdmin(email: string, pass: string) {
  const res = await fetch(`${API_BASE_URL}/api/v1/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: pass,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Invalid login credentials");
  }

  return await res.json();
}

export async function fetchAdminMe(token: string) {
  const res = await fetch(`${API_BASE_URL}/api/v1/admin/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to authenticate session");
  }

  return await res.json();
}

export async function createAdminProduct(token: string, productData: any) {
  const res = await fetch(`${API_BASE_URL}/api/v1/admin/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Failed to create product");
  }

  return await res.json();
}

export async function updateAdminProduct(token: string, id: number | string, productData: any) {
  const res = await fetch(`${API_BASE_URL}/api/v1/admin/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.detail || `Failed to update product ${id}`);
  }

  return await res.json();
}

export async function deleteAdminProduct(token: string, id: number | string) {
  const res = await fetch(`${API_BASE_URL}/api/v1/admin/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.detail || `Failed to delete product ${id}`);
  }

  return await res.json();
}

export async function fetchAdminEnquiries(token: string, status?: string) {
  const params = new URLSearchParams();
  if (status) params.append("status", status);

  const url = `${API_BASE_URL}/api/v1/admin/enquiries${params.toString() ? `?${params.toString()}` : ""}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch administrative enquiries");
  }

  return await res.json();
}

export async function updateAdminEnquiryStatus(
  token: string,
  id: number | string,
  status: string,
  internalNotes?: string
) {
  const res = await fetch(`${API_BASE_URL}/api/v1/admin/enquiries/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status,
      internal_notes: internalNotes || undefined,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.detail || "Failed to update enquiry status");
  }

  return await res.json();
}
