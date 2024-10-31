import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./client.css";
import "./dashboard.css";
import Client from "@/components/shared/client";
import React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "G-Motivate",
  description:
    "Access Comprehensive Mentorship, Informational and Educational Content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Client>{children}</Client>
      </body>
    </html>
  );
}
