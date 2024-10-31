"use client";
import { GetUserInfo } from "@/lib/agent-api/getUserInfo";
import { martian_mono, recoleta } from "@/lib/agent-api/utils";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  const [copy, setCopy] = useState(false);
  const { referralCode } = GetUserInfo();

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopy(true);
    });
  };
  return (
    <section className="flex flex-col lg:flex-row lg:mx-auto lg:w-full pt-16 lg:py-10 px-5 space-y-16 lg:space-y-0 lg:my-10 lg:px-14 lg:gap-9">
      <div className="space-y-5 lg:py-10 lg:w-[45%]">
        <h1 className={`${recoleta.className} text-3xl lg:text-4xl font-bold`}>
          Welcome to your <br className="lg:hidden" />
          <span className="text-nowrap">G-Motivate</span> Agent Portal
        </h1>
        <p className="leading-[27px] text-[.85rem] lg:text-[1rem] text-[#595D62]">
          Track and manage your activity and the activities of your referees.
          You can see the people you refer, their purchases and your commission
          earnings as they purchase
        </p>
      </div>
      <div className="flex flex-col lg:justify-center gap-4 rounded-[20px] py-10 px-6 lg:px-12 bg-gradient-to-tr from-[#C8E9FF] to-[#F1F9FF] lg:w-[55%]">
        <h4 className={`text-xl ${recoleta.className} `}>Your Referral Code</h4>
        <p className="text-[#1C1C1C] text-[.95rem] font-[Inter]">
          Share this code with the people you introduce to the app to make a{" "}
          <span className="text-black font-semibold">30% </span>
          commission from all their content purchases.
        </p>
        <div className="flex justify-between items-center mt-5">
          <h3
            className={`${martian_mono.className} font-mediumlg:font-bold text-[1.25rem] lg:text-[1.57rem] text-[#1C1C1C]`}
          >
            {referralCode}
          </h3>
          {/* trying to avoid position */}
          <div
            onClick={handleCopy}
            className="flex lg:hidden cursor-pointer py-3 px-3 gap-2 rounded-[12px] border-[1px] border-[#E6E6E6]"
          >
            <Image
              src={"/gravity-ui_copy.svg"}
              height={24}
              width={24}
              alt="Copy code icon"
            />
            <p>{copy === true ? "Copied" : "Copy Code"}</p>
          </div>
          <div
            onClick={handleCopy}
            className="hidden lg:flex cursor-pointer py-3 px-3 gap-2 rounded-[12px] border-[1px] border-[#E6E6E6]"
          >
            <Image
              src={"/gravity-ui_copy.svg"}
              height={28}
              width={28}
              alt="Copy code icon"
            />
            <p className="lg:text-xl">
              {copy === true ? "Copied" : "Copy Code"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
