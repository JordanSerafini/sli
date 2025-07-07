// 📌 Ce fichier ne doit pas avoir "use client"
import React, { ReactNode } from "react";
import { Metadata } from "next";
import RootLayout from "./RootLayout";

export const metadata: Metadata = {
  title: "Solution Logique",
  description: "Votre partenaire informatique.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
