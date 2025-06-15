import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Healio - AI-Powered Healthcare Platform",
  description:
    "Connect with Oslo's best healthcare specialists through AI-guided consultations",
  keywords: "healthcare, AI, specialists, Oslo, medical consultation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true" className={inter.className}>
        {children}
      </body>
    </html>
  );
}
