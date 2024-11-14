import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "G-Motivate",
  description:
    "Access Comprehensive Mentorship,Informational and Educational Content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    //   <head>
    //     <link rel="preconnect" href="https://fonts.googleapis.com" />
    //     <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    //     <link href={sansita} rel="stylesheet" />
    //     <link href={nunito} rel="stylesheet" />
    //     <link href={averia} rel="stylesheet" />
    //   </head>

    <section className={`scroll-smooth ${inter.className}`}>
      {children}
      <Footer />
    </section>
    // </html>
  );
}
