import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-[#5500B0]  pl-5 font-nunito">
      <div className="flex flex-col py-6 gap-8 lg:flex-row  lg:pt-16 ">
        {/* Top Section */}
        <div className="flex flex-col  gap-7 flex-1">
          <div className="flex items-center gap-4 ">
            <Image
              src="/landing/logo.svg"
              alt="G-Motivate Logo"
              width={35}
              height={35}
            />
            <span className="text-white text-xl font-nunito">G-Motivate</span>
          </div>

          <h1 className="text-white text-sm font-nunito">
            Top up your learning with mentorship, entertaining, informational,
            and academic video, book, and exam content from G-Motivate.
          </h1>
          <div className="flex items-center gap-7">
            <Image
              src="/landing/playstore.svg"
              alt="Play Store"
              height={56}
              width={120}
            />
            <Image
              src="/landing/appstore.svg"
              alt="App Store"
              height={58}
              width={120}
            />
          </div>
        </div>

        {/* Center Section */}

        <div className="flex flex-col gap-8 flex-1 lg:items-center">
          <h1 className="text-white text-xl font-medium font-nunito">
            Sitemap
          </h1>
          <ul className="list-none flex flex-col gap-2">
            <li className="text-white text-sm lg:pl-5 font-nunito">
              <Link
                target="_blank"
                href={"https://youtu.be/LdRuBmEljhg?si=XkICNq1R_VWP0-jd"}
              >
                How it Works
              </Link>
            </li>
            <li className="text-white text-sm lg:pl-5 font-nunito">
              <Link href={"#mentors"}>Become a Mentor</Link>
            </li>
            <li className="text-white text-sm lg:pl-5 font-nunito">
              <Link href={"#videos"}>Videos</Link>
            </li>
            <li className="text-white text-sm lg:pl-5 font-nunito">
              <Link href={"#books"}>Books</Link>
            </li>
            <li className="text-white text-sm lg:pl-5 font-nunito">
              <Link href={"#how-it-works"}>Exam Materials</Link>
            </li>
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="flex-1 flex flex-col lg:items-center gap-4">
          <h1 className="text-white text-xl font-medium font-nunito">
            Connect with us
          </h1>
          <ul className="list-none flex flex-col gap-5">
            <li className="flex gap-2 lg:pl-2">
              <Image
                src="/landing/phone-icon.svg"
                alt="Phone Icon"
                width={20}
                height={20}
              />
              <span className="text-white text-sm font-nunito">0713582296 / 0716044379</span>
            </li>
            <li className="flex gap-2 lg:pl-2">
              <Image
                src="/landing/mail-icon.svg"
                alt="Mail Icon"
                width={20}
                height={20}
              />
              <span className="text-white text-sm font-nunito">
                info@gmotivate.com
              </span>
            </li>
            <li className="flex gap-2 lg:pl-2">
              <Image
                src="/landing/fb-icon.svg"
                alt="Facebook Icon"
                width={20}
                height={20}
              />
              <span className="text-white text-sm font-nunito">facebook</span>
            </li>
            <li className="flex gap-2 lg:pl-2">
              <Image
                src="/landing/insta-icon.svg"
                alt="Instagram Icon"
                width={20}
                height={20}
              />
              <span className="text-white text-sm font-nunito">instagram</span>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-white-600" />

      <div className="mt-10 flex flex-col gap-6 items-center pb-8">
        <p className="text-white text-sm font-nunito">
          Copyright © 2024 G-Motivate
        </p>
        <p className="text-white text-sm font-nunito">
          Designed & Built by{" "}
          <Link href="https://www.glitexsolutions.co.ke/" passHref  target="_blank">
            <span className="text-blue-500 hover:underline cursor-pointer font-nunito">
              Glitex Solutions
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
