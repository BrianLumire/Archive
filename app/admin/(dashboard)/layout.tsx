"use client";
import { useAuth } from "@/components/dashboard/auth/AuthContext";
import { ThemeProvider, Sidebar, Navbar } from "@/components/dashboard/shared";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, authUser } = useAuth();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  useEffect(() => {
    if (!authUser) {
      router.push("/admin/auth/signin");
    }
    if (user && user.is_admin === false) {
      router.push("/admin/auth/signin");
    }
  }, [user, authUser]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="bg-background min-h-screen max-w-screen">
        <div
          className={cn(
            `hidden md:flex 
           md:fixed h-full bg-black z-[5]`,
            isCollapsed ? "w-14" : "w-[250px]"
          )}
        >
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </div>
        <div
          className={cn(
            " relative ",
            !isCollapsed ? "md:ml-[250px]" : "md:ml-14"
          )}
        >
          <div
            className="sticky bg-card top-0 flex items-center h-[70]
           md:h-[90px] border-b border-borhder  z-[10]"
          >
            <Navbar />
          </div>
          <div className="z-[2] rpx py-4 md:py-6 ">{children}</div>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default Layout;
