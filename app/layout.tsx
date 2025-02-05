// 📌 Ce fichier ne doit pas avoir "use client"
import { Metadata } from "next";
import RootLayout from "./RootLayout";

export const metadata: Metadata = {
  title: "Solution Logique",
  description: "Votre partenaire informatique.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
