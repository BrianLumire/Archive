import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/lib/agent_provider";
import DesktopNavbar from "@/components/agent/desktopNavbar";
import { Toaster } from "react-hot-toast";
import React from "react";
import Navbar from "@/components/agent/navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "G-Motivate Agent",
  description: "Track and manage your activity and the activities of your referees.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      className={`${inter.className} scroll-smooth antialiased w-[100vw] min-h-[100svh] relative bg-white`}
    >
      <AuthProvider>
        <Navbar />
        <DesktopNavbar />
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </section>
  );
}
