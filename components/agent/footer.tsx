"use client";
import { manrope } from "@/lib/agent-api/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  return (
    <footer
      className={` bg-[#015A98] flex flex-col text-white mx-auto absolute w-full bottom-0`}
    >
      <div className="max-w-[1500px] mx-auto w-full">
        <div className="flex flex-col gap-7 px-12 py-7 md:py-10 md:flex-row md:justify-between">
          <h2 className="text-[1.3rem] font-semibold">G-Motivate</h2>
          <div className="flex gap-8">
            <Link href={""}>
              <Image
                src={"/majesticons_mail-line.svg"}
                height={25}
                width={25}
                alt="Mail Icon"
              />
            </Link>
            <Link href={""}>
              <Image
                src={"/ri_facebook-fill.svg"}
                height={24}
                width={24}
                alt="Mail Icon"
              />
            </Link>
            <Link href={""}>
              <Image
                src={"/mage_x.svg"}
                height={24}
                width={24}
                alt="Mail Icon"
              />
            </Link>
            <Link href={""}>
              <Image
                src={"/fa6-brands_youtube.svg"}
                height={24}
                width={24}
                alt="Mail Icon"
              />
            </Link>
          </div>
          <div
            className={`mb-4
           ${manrope.className}
           `}
          >
            Designed and Built By{" "}
            <Link
              href={"https://www.glitexsolutions.co.ke/"}
              target="_blank"
              className="underline"
            >
              Glitex Solutions
            </Link>
          </div>
        </div>
        <hr className="h-[1px] md:mx-12 md:h-2 max-w-[1500px]" />
        <p className="px-5 text-sm text-center py-7">
          © 2024 G-Motivate. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
