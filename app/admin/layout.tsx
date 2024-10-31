import { AuthProvider } from "@/components/dashboard/auth/AuthContext";
import React from "react";
import "../globals.css";
import "../client.css";
import "../dashboard.css";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Layout;
