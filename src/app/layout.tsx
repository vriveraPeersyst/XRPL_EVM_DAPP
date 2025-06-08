// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import React, { ReactNode } from "react";
import Image from "next/image";
import ContextProvider from "@/contexts";

export const metadata: Metadata = {
  title: "xrpl-dapp-template",
  description: "A dapp template for XRPL EVM",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        {/* Remove <Nav /> and add logo at the top center */}
        <div className="w-full flex items-center justify-center py-6">
          <Image
            src="/assets/XRPLEVM_FullWhiteLogo.png"
            alt="XRPL EVM logo"
            width={0}
            height={0}
            sizes="30vw"
            style={{ width: "30vw", maxWidth: "30vw", height: "auto" }}
            priority
          />
        </div>
        <ContextProvider cookies={null}>{children}</ContextProvider>
      </body>
    </html>
  );
}
