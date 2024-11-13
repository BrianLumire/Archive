"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Password from "./password";
import ManageProfile from "./manageProfile";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GetUserInfo } from "@/lib/agent-api/getUserInfo";
import { useAuth } from "@/lib/agent_provider";

const Navbar = () => {
  const { userData } = GetUserInfo();
  const { accessToken } = useAuth();

  const [open, setOpen] = useState(false);

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

  const { setAccessToken } = useAuth();
  const router = useRouter();

  function logout() {
    setAccessToken(null);
    localStorage.clear();
    router.push("/agent/auth/sign-in");
  }

  return (
    <nav
      className={`shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] py-3 px-5 lg:hidden`}
    >
      <section className="flex justify-between items-center max-w-3xl mx-auto">
        <section className="flex gap-3 items-center">
          <Image src={"/agent-logo.svg"} height={60} width={60} alt="Logo" />
          <h3 className="text-[#3AAFFF] text-lg">G-Motivate</h3>
        </section>
        <section className="flex justify-between items-center gap-3">
          {accessToken ? (
            <div className="bg-[#F1F1F1] h-12 w-12 flex items-center justify-center rounded-full">
              {nameInitials}
            </div>
          ) : (
            <></>
          )}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side={"left"}>
              <section className="flex flex-col h-full justify-between ml-12">
                <div className="flex flex-col gap-10 text-base items-start h-4/5 mt-20">
                  <Link
                    href={"/agent"}
                    className="text-[#3AAFFF] font-semibold"
                  >
                    Home
                  </Link>
                  <Link
                    href={"#earnings"}
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => {
                        document
                          .getElementById("earnings")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 350);
                    }}
                  >
                    My Earnings
                  </Link>
                  <Link
                    href={"#referrals"}
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => {
                        document
                          .getElementById("referrals")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 350);
                    }}
                  >
                    My Referrals
                  </Link>
                  <Link
                    href={"#payouts"}
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => {
                        document
                          .getElementById("payouts")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 350);
                    }}
                  >
                    Payouts
                  </Link>
                  {accessToken ? (
                    <>
                      <ManageProfile />
                      <Link target="_blank" href="mailto:info@gmotivate.com">
                        Contact Support
                      </Link>
                      <Password />
                      <Link href={""} onClick={logout}>
                        Logout
                      </Link>
                    </>
                  ) : (
                    <Link target="_blank" href="mailto:info@gmotivate.com">
                      Contact Support
                    </Link>
                  )}
                </div>
                <p className="text-center text-sm my-10 text-[#595D62]">
                  © 2024 G-Motivate. All rights reserved
                </p>
              </section>
            </SheetContent>
          </Sheet>
        </section>
      </section>
    </nav>
  );
};

export default Navbar;
