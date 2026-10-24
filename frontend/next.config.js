/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/catalog", destination: "/products", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/download/catalog-pdf", destination: "/docs/SUNKA_Battery_Catalogue.pdf", permanent: true },
    ];
  },
  async rewrites() {
    const backend = (process.env.BACKEND_URL || "http://127.0.0.1:8000").replace(/\/$/, "");
    return [{ source: "/api/:path*", destination: `${backend}/api/:path*` }];
  },
};
module.exports = nextConfig;
