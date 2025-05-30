// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import React, { ReactNode } from "react";
import Nav from "@/components/Nav";
import ContextProvider from "@/contexts";

export const metadata: Metadata = {
  title: "xrpl-dapp-template",
  description: "A dapp template for XRPL EVM",
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-softwhite font-sans antialiased">
        <Nav />
        <ContextProvider cookies={null}>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
