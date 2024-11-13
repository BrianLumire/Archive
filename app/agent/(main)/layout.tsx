import DesktopNavbar from "@/components/agent/desktopNavbar";
import "../../globals.css";
import Footer from "@/components/agent/footer";
import Navbar from "@/components/agent/navbar";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <DesktopNavbar />
      {children}
      <Footer />
    </div>
  );
}
