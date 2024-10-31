"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Search,
  Settings,
  Bell,
  MoveDownRight,
  ChevronDown,
  User,
  Power,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import MobileSidebarDrawer from "./mobile_sidebar_drawer";
import { PageSearch } from "./page_search";
import { NotificationsDrawer } from "./notifications";
import { Button } from "@/components/ui/button";
import { RiSettingsFill } from "react-icons/ri";
import { useAuth } from "../auth/AuthContext";
import { SettingsModal } from "../modals/settings";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="px-4 w-full ">
      <div className="bg-card w-full md:px-4 py-2 rounded-lg fx-btw-c md:border md:border-border border-opacity-0 dark:border-border/90">
        <div className="flex md:hidden">
          <MobileSidebarDrawer />
        </div>
        <div className="hidden md:flex">
          <NavLeftSide />
        </div>

        <NavRightSide />
      </div>
    </div>
  );
};

const NavLeftSide = () => {
  return <PageSearch />;
};
const NavRightSide = () => {
  const { setTheme } = useTheme();

  return (
    <div className="fx-btw-c gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="border:outline-none dark:bg-muted "
        >
          <Button variant="ghost" size="icon" className="focus:outline-none">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UserSettings />
    </div>
  );
};

const UserSettings = () => {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="fbc gap-2 px-1">
          <Avatar className="w-8 h-8 ">
            {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
            <AvatarFallback>
              {<User size={24} className="text-primary dark:text-primary/50" />}
            </AvatarFallback>
          </Avatar>
          <div className="fx-btw-c gap-4 m-hidden">
            <span className="">{user?.full_name}</span>
            <ChevronDown size={19} />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[170px] cursor-pointer">
        <DropdownMenuItem
          className="fic gap-2 cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          <SettingsModal /> {/* </div> */}
        </DropdownMenuItem>
        <DropdownMenuItem className="fic gap-2" asChild>
          <Link href={"/admin/auth/signin"}>
            <Power size={16} />
            <span>Logout</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export { Navbar };
