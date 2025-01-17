import { nunito } from "@/lib/agent-api/utils";
import Image from "next/image";
import Link from "next/link";

export default function Listing() {
  return (
    <div
      id="mentors"
      className="relative lg:h-[500px] h-[800px] pl-6  pt-4  flex flex-col lg:flex-row mb-14 bg-cover bg-center"
      style={{ backgroundImage: "url('/landing/connect-bg.png')" }}
    >
      <div className=" pb-9 pr-8 lg:flex-1 lg:flex lg:items-center lg:justify-center">
        <h1 className="text-white text-3xl lg:text-4xl font-bold font-averia">
          Earn commissions on every purchase
        </h1>
      </div>
      <div className="pb-9  lg:flex-1 lg:flex lg:items-center lg:justify-center">
        <Image
          src="/landing/connect.png"
          alt="Illustration of G-Motivate"
          height={280}
          width={280}
          className="lg:h-[350px] lg:w-[350px]"
        />
      </div>
      <div className=" pr-8 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
        <div className="pb-8">
          <p className={`pb-8 text-white text-base ${nunito.className}`}>
            G-Motivate admins onboard new Mentors onto the Mentors network to
            reach more students in schools across the country.
          </p>
          <p className={`text-white text-base ${nunito.className}`}>
            An agent earns a commission when their referrals unlock videos,
            books, or exam materials on the app. However, a G-Motivate agent
            needs to be a teacher in a high school.
          </p>
        </div>
        <div className="flex items-center  gap-6 ">
          <Link href="/contact">
            <Link
              href={`mailto:info@gmotivate.com?subject=${encodeURIComponent(
                "Agent Application Request"
              )}`}
              className="bg-white text-nowrap font-nunito py-2 px-6 rounded-lg text-base font-semibold text-[#A55FEF]"
            >
              Contact Us
            </Link>
          </Link>
          {/* <Link href="#how-it-works">
            <button className="flex items-center gap-3 text-nowrap font-nunito bg-white py-2 px-6 text-base font-semibold rounded-lg text-[#A55FEF]">
              <Image
                src="/landing/play-icon.svg"
                alt="Play icon"
                height={15}
                width={15}
              />
              How it works
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}
