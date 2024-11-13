"use client"; // Use lowercase for 'use client'

import { nunito, recoleta } from "@/lib/agent-api/utils";
import Image from "next/image";
import Link from "next/link";

export default function Closing() {
  return (
    <div className="bg-[#A55FEF1A] pt-4 lg:mx-36 mb-16 rounded-lg mx-4 flex flex-col  lg:flex-row">
      <div className="mb-14 lg:flex-1">
        <div className="pl-4 lg:pl-14 pb-7">
          <h1 className={`text-[#3AAFFF] pb-5 text-2xl ${recoleta.className}`}>
            Join the Movement of Smart Learners
          </h1>
          <p className={`text-[#02256D] ${nunito.className}`}>
            Accelerate your learning and capacity development with G-Motivate
            resources that not only prepare your for academic success but also
            equip you with life and street skills to get you ahead of the rest.
          </p>
        </div>

        <div className="flex pl-4 lg:pl-14  gap-3 lg:items-center">
          <Image
            src="/landing/play-closing.svg"
            alt=""
            height={59}
            width={125}
            className=" lg:w-[169px] lg:h-[55px]"
          />
          <Image
            src="/landing/app-closing.svg"
            alt=""
            height={59}
            width={145}
            className=" lg:w-[172px] lg:h-[70px]"
          />
        </div>
      </div>
      <div className="pb-4 lg:pb-0 lg:flex-1 lg:justify-center  flex  ">
        <Image src="/landing/boy-graphic.png" alt="" height={400} width={350} />
      </div>
    </div>
  );
}
