"use client";

import React from "react";
import "./styles/global.scss";
import "./styles/app.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";

import Navbar from "./navbar/page";
import Footer from "./footer/page";
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
      <body>
        <Navbar />
        <main>{children}</main>
        {pathname !== "/contact" && <Contact_Btn />}
        <Footer />
      </body>
    </html>
  );
}
