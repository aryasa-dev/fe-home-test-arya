import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dashboard Admin",
    template: "Dashboard - %s"
  },
  description: "Dashboard Admin",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.className} antialiased bg bg-gray-100`}>
        <SidebarProvider>
          <AppSidebar />
          <Navbar isAdmin />
          <main className="pt-20 pb-10 w-full">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
