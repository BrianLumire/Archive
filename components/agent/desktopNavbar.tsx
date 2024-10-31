"use client";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import ManageProfile from "./manageProfile";
import Password from "./password";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GetUserInfo } from "@/lib/agent-api/getUserInfo";
import { useAuth } from "@/lib/agent_provider";

const DesktopNavbar = () => {
  const { userData } = GetUserInfo();
  const { accessToken } = useAuth();
  const [currentLink, setCurrentLink] = useState("home");

  function getInitials(name: string) {
    if (!name?.trim()) {
      return "";
    }

    const nameArray = name.trim().split(/\s+/);
    const firstNameInitial = nameArray[0]?.charAt(0).toUpperCase() || "";
    const lastNameInitial =
      nameArray.length > 1
        ? nameArray[nameArray.length - 1].charAt(0).toUpperCase()
        : "";

    return firstNameInitial + lastNameInitial;
  }

  const nameInitials = getInitials(userData?.full_name as string);

  function mailToSupport() {
    window
      ?.open(
        `mailto:support@gmotivate.com?subject=${encodeURIComponent(
          "Hello Support"
        )}`,
        "_blank"
      )
      ?.focus();
  }

  const { setAccessToken } = useAuth();
  const router = useRouter();

  function logout() {
    setAccessToken(null);
    localStorage.clear();
    router.push("/agent/auth/sign-in");
  }

  return (
    <nav
      className={`hidden lg:block shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] px-14`}
    >
      <section className="flex justify-between gap-2 items-center max-w-[1500px] mx-auto">
        <section className="flex gap-3 items-center">
          <Image src={"/agent-logo.svg"} height={60} width={60} alt="Logo" />
          <h3 className="text-[#3AAFFF] text-lg text-nowrap">G-Motivate</h3>
        </section>
        <div className="flex gap-5 lg:gap-14 text-base font-medium items-center h-full">
          <Link
            href={"/agent"}
            onClick={() => setCurrentLink("home")}
            className={`${
              currentLink === "home" && "border-b-[#3AAFFF] border-b-4"
            } font-semibold h-full py-6 px-5`}
          >
            Home
          </Link>

          <Link
            href={"#earnings"}
            onClick={() => setCurrentLink("earnings")}
            className={`${
              currentLink === "earnings" && "border-b-[#3AAFFF] border-b-4"
            } font-semibold h-full py-6 px-4`}
          >
            My Earnings
          </Link>

          <Link
            href={"#referrals"}
            onClick={() => setCurrentLink("referrals")}
            className={`${
              currentLink === "referrals" && "border-b-[#3AAFFF] border-b-4"
            } font-semibold h-full py-6 px-4`}
          >
            My Referrals
          </Link>

          <Link
            href={"#payouts"}
            onClick={() => setCurrentLink("payouts")}
            className={`${
              currentLink === "payouts" && "border-b-[#3AAFFF] border-b-4"
            } font-semibold h-full py-6 px-4`}
          >
            Payouts
          </Link>
        </div>
        {accessToken ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3">
              <div className="bg-[#F1F1F1] h-12 w-12 flex items-center justify-center rounded-full">
                {nameInitials}
              </div>
              <div className="flex items-center gap-2 truncate">
                <p>{userData?.full_name}</p>
                <ChevronDown size={20} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-8">
              <ManageProfile />
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex gap-3 py-2"
                onClick={mailToSupport}
              >
                <Image
                  src={"/carbon_headset.svg"}
                  height={24}
                  width={24}
                  alt="Profile Icon"
                />
                Contact Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Password />
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="flex gap-3 py-2">
                <Image
                  src={"/solar_logout-outline.svg"}
                  height={24}
                  width={24}
                  alt="Profile Icon"
                />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            href={"/agent/auth/sign-in"}
            className="bg-[#3AAFFF] text-white py-1 px-5 rounded-md"
          >
            Login
          </Link>
        )}
      </section>
    </nav>
  );
};

export default DesktopNavbar;
