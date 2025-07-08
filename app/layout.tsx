// 📌 Ce fichier ne doit pas avoir "use client"
import React, { ReactNode } from "react";
import { Metadata } from "next";
import RootLayout from "./RootLayout";

export const metadata: Metadata = {
  title: "Solution Logique",
  description: "Votre partenaire informatique.",
  icons: {
    icon: '/assets/logo.webp',
    shortcut: '/assets/logo.webp',
    apple: '/assets/logo.webp',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
