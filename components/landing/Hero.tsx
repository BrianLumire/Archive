"use client";

import { nunito, recoleta } from "@/lib/agent-api/utils";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex flex-col justify-center items-center mb-11  ">
      <div className=" flex gap-9 flex-col justify-center items-center md:mx-14 xl:mx-36 xl:px-40">
        <h1 className={`text-2xl md:text-4xl text-center font-averia ${recoleta.className}`}>
          Access Comprehensive Mentorship,Informational and Educational Content
        </h1>
        <p className={`text-center text-sm px-2 ${nunito.className}`}>
          Explore a collection of Videos covering several topics and attending
          to different needs of students at high school level. There's a wide
          catalog of books you can read and exam papers you can use for academic
          revisions.
        </p>
      </div>
      <div className="flex flex-col mt-20 gap-20">
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/landing/playstore.svg"
            alt=""
            height={59}
            width={125}
            className=" lg:w-[175px] lg:h-[60px]"
          />
          <Image
            src="/landing/appstore.svg"
            alt=""
            height={59}
            width={145}
            className=" lg:w-[180px] lg:h-[79px]"
          />
        </div>
        <div className=" flex flex-col gap-5 md:gap-10 justify-center items-center">
          {/* <Image
            src="/landing/Brisbane Event.png"
            alt=""
            width={330}
            height={156}
            className="sm:w-[460px] sm:h-[203px] md:w-[560px] md:h-[283px] lg:w-[850px] lg:h-[348px]"
          /> */}
          <iframe
            width="420"
            height="315"
            src="https://www.youtube.com/embed/LdRuBmEljhg?si=FYCQjIwGL1kfjCYK"
            className="sm:w-[460px] sm:h-[250px] md:w-[560px] md:h-[300px] lg:w-[850px] lg:h-[400px] rounded-xl"
          ></iframe>
          <span
            id="how-it-works"
            className={`font-medium text-xl text-center text-[#333333] ${recoleta.className}`}
          >
            Here's how it works
          </span>
        </div>
      </div>
    </div>
  );
}
