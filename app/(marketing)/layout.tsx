import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const sansita = "https://fonts.googleapis.com/css2?family=Sansita:wght@400;600&display=swap";
const nunito = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600&display=swap";
const averia = "https://fonts.googleapis.com/css2?family=Averia+Serif+Libre&display=swap";

export const metadata: Metadata = {
  title: "G-Motivate Terms",
  description: "Terms & Conditions",
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

      <section className={inter.className}>
        {children}
      </section>
    // </html>
  );
}
