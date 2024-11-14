"use client";

import Boxes from "@/components/landing/Boxes";
import Closing from "@/components/landing/Closing";
import Hero from "@/components/landing/Hero";
import Listing from "@/components/landing/Listing";
import Navbar from "@/components/landing/Navbar";

const Page = () => {
  return (
    <>
      <header className="relative p-2 text-white bg-[url('/landing/background-banner.png')] bg-cover bg-center h-[650px]">
        <Navbar />
        {/*hero section */}
        <Hero />
      </header>
      <Boxes />
      <Listing />
      <Closing />
    </>
  );
};

export default Page;
