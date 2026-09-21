/* eslint-disable */
// @ts-nocheck
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppWalletProvider from "@/components/AppWalletProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShelterFund — Sponsor a Rescue. Launch a Coin.",
  description: "Hijacking memecoin liquidity to fund real-world animal rescues. Built on Solana Token-2022.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AppWalletProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </AppWalletProvider>
      </body>
    </html>
  );
}
