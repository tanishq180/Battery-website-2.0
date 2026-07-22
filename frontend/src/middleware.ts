import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected paths regex or prefix
  const isProtectedAdminPath =
    pathname.startsWith("/admin/dashboard") ||
    pathname.startsWith("/admin/products") ||
    pathname.startsWith("/admin/enquiries");

  if (isProtectedAdminPath) {
    const adminToken = request.cookies.get("admin_token")?.value;

    if (!adminToken) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
