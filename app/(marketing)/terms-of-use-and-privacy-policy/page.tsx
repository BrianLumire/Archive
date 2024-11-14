import Navbar from "@/components/landing/Navbar";
import PrivacyPolicy from "@/components/landing/privacyPolicy";
import TermsOfUse from "@/components/landing/termsOfUse";
import TermsOfUseHero from "@/components/landing/termsOfUseHero";
import React from "react";

const Page = () => {
  return (
    <section>
      <div
        className="relative p-4 text-white"
        style={{
          backgroundImage: "url('/landing/backsplash.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "600px",
        }}
      >
        <Navbar />
        {/*hero section */}
        <TermsOfUseHero />
      </div>
      <section className="w-full max-w-[1500px] mx-auto">
        <TermsOfUse />
        <PrivacyPolicy />
      </section>
    </section>
  );
};

export default Page;
