"use client";

import React from "react";
import "./styles/globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Contact_Btn from "@/components/ui/contact_btn/Contact_Btn";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="fr">
      <body className="bg-white">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        {pathname !== "/contact" && <Contact_Btn />}
        <Footer />
      </body>
    </html>
  );
}
