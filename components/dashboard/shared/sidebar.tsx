"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { sidebar_links_admin } from "../data/ui_data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MdOutlineLogout } from "react-icons/md";
import { useAuth } from "../auth/AuthContext";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ChevronLeft, ChevronRight } from "lucide-react";

export const Sidebar = ({
  isCollapsed: collapsed,
  setIsCollapsed,
}: {
  isCollapsed?: boolean;

  setIsCollapsed?: (value: boolean) => void;
}) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isActive, setIsActive] = React.useState(pathname);

  useEffect(() => {
    setIsActive(pathname);
  }, [pathname]);

  const NavItem = ({
    link,
    active,
  }: {
    link: { name: string; path: string; icon: React.ElementType };
    active: boolean;
  }) => {
    if (collapsed) {
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={active ? "link" : "ghost"}
                size="icon"
                className={cn(
                  "w-10 h-10 flex items-center justify-center",
                  active && "bg-primary/10"
                )}
                asChild
              >
                <Link href={link.path}>
                  <link.icon height={20} width={20} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              {link.name}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <Button
        variant={active ? "link" : "ghost"}
        className={cn(
          "flex items-center justify-start -ml-4",
          active && "gap-[2px]"
        )}
        asChild
      >
        <Link href={link.path}>
          {active && <div className="h-full w-[4px] rounded-r-lg bg-primary" />}
          <link.icon height={20} width={20} className="mr-2" />
          <span className={cn("text-sm font-[400]", active && "font-semibold")}>
            {link.name}
          </span>
        </Link>
      </Button>
    );
  };

  return (
    <div
      className={cn(
        "h-full sticky top-0 bg-card border-r border-b flex flex-col",
        collapsed ? "w-14" : "w-full"
      )}
    >
      <div
        className={cn(
          "h-[90px] flex items-center border-b border-border",
          collapsed ? "justify-center p-2" : "p-4 justify-between"
        )}
      >
        {!collapsed && (
          <div>
            <Image
              alt="logo"
              src="/logo.svg"
              width={40}
              height={40}
              className="h-28 w-28 dark:hidden"
            />
            <span className="ts5 font-bold text-primary hidden dark:block">
              G-MOTIVATE
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsCollapsed && setIsCollapsed(!collapsed);
          }}
          className="h-8 w-8  hidden md:flex"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className={cn("flex-1", collapsed ? "p-2" : "p-4")}>
        <div className="links flex flex-col gap-3">
          {sidebar_links_admin.map((category, index) => (
            <div key={index}>
              {!collapsed && (
                <h4 className="h6 text-foreground/60 dark:text-foreground/80 mb-2">
                  {category.type}
                </h4>
              )}
              <div
                className={cn(
                  "flex flex-col",
                  collapsed ? "gap-2" : "my-[5px]"
                )}
              >
                {category.links.map((link, index) => {
                  const active =
                    pathname.split("/")[2] === link.path.split("/")[2] ||
                    pathname === link.path;

                  return <NavItem key={index} link={link} active={active} />;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {collapsed ? (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="p-2 flex justify-center cursor-pointer"
                onClick={() => logout()}
              >
                <MdOutlineLogout size={20} />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <div
          className="rpx py-10 fx gap-1 cursor-pointer"
          onClick={() => logout()}
        >
          <MdOutlineLogout size={20} />
          <span className="text-base font-normal">Logout</span>
        </div>
      )}
    </div>
  );
};
