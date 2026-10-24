import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  title: "Sunka Batteries | Power for Every Possibility",
  description:
    "Sunka batteries by MERI Industries. Explore sealed lead-acid batteries, lithium cells, UPS backup and industrial energy storage.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-slate-900 min-h-screen flex flex-col antialiased">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
