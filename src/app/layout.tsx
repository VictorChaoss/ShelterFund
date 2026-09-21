import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AppWalletProvider from "@/components/AppWalletProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShelterFund - Route token fees to animal rescues",
  description: "Point a token's creator fees at any animal rescue. Claimed on-chain, paid directly to the shelter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} flex`}>
        <AppWalletProvider>
          <Sidebar />
          <div className="min-w-0 flex-1 flex flex-col">
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
          </div>
        </AppWalletProvider>
      </body>
    </html>
  );
}
