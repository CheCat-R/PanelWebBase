import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Sidebar from "@/app/components/Sidebar";
import Navbar from "@/app/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Panel CheCat",
  description: "Panel de administración CheCAT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <div className="mainWrapper">
          <Sidebar />
          <div className="pageWrapper">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}


