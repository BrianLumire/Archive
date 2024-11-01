"use client";

import { useAuth } from "@/lib/agent_provider";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type AgentStats = {
  referred_clients: number;
  total_earnings: number;
  total_disbursed: number;
  current_balance: number;
}

const Statistics = () => {
  const { accessToken } = useAuth();
  const [agentStats, setAgentStats] = useState<AgentStats>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios({
          method: "get",
          url: "https://api.gmotivate.com/api/v1/agents/statistics/",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Attach the JWT token
          },
        })
          .then((response) => {
            if (response.status === 401) {
            } else if (response.status === 200) {
              setAgentStats(response.data);
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
            }
          });
      } catch (error) {
        throw error;;
        toast.error("An error occcured.");
      }
    };
    fetchData();
  }, [accessToken]);
  return (
    <section className="flex flex-col justify-between items-center py-16 px-5 gap-5 w-full">
      <h1 className="text-2xl font-bold">My Statistics</h1>
      <p className="leading-[27px] text-[.85rem] lg:text-[.9remrem] text-center text-[#595D62]">
        View your cumulative commission from the platform, the disbursed
        <br className="hidden lg:block" />
        commission and current balance
      </p>
      <section className="flex flex-col lg:flex-row gap-5 w-full">
        {/* Stat Cards */}
        <div className="flex items-center gap-4 rounded-[20px] py-5 px-5 border-[1.5px] border-[#E6E6E6] w-full">
          <div className="bg-[#F5F5F5] p-5 rounded-full">
            <Image
              src={"/basil_user-outline.svg"}
              height={32}
              width={32}
              alt="User icon"
            />
          </div>
          <div className="flex flex-col gap-1 text-[#1C1C1C]">
            <h3 className="text-[1rem] font-semibold">
              {agentStats?.referred_clients}
            </h3>
            <p className="text-[.75rem]">Referred Clients</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-[20px] py-5 px-5 border-[1.5px] border-[#E6E6E6] w-full">
          <div className="bg-[#F5F5F5] p-5 rounded-full">
            <Image
              src={"/la_money-bill-wave.svg"}
              height={26}
              width={26}
              alt="User icon"
            />
          </div>
          <div className="flex flex-col gap-1 text-[#1C1C1C]">
            <h3 className="text-[1rem] font-semibold">
              Ksh {agentStats?.total_earnings.toFixed(2)}
            </h3>
            <p className="text-[.75rem]">Total Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-[20px] py-5 px-5 border-[1.5px] border-[#E6E6E6] w-full">
          <div className="bg-[#F5F5F5] p-5 rounded-full">
            <Image
              src={"/hugeicons_money-send-02.svg"}
              height={26}
              width={26}
              alt="User icon"
            />
          </div>
          <div className="flex flex-col gap-1 text-[#1C1C1C]">
            <h3 className="text-[1rem] font-semibold">
              Ksh {agentStats?.total_disbursed.toFixed(2)}
            </h3>
            <p className="text-[.75rem]">Total Disbursed</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-[20px] py-5 px-5 border-[1.5px] border-[#E6E6E6] w-full">
          <div className="bg-[#F5F5F5] p-5 rounded-full">
            <Image
              src={"/streamline_briefcase-dollar.svg"}
              height={26}
              width={26}
              alt="User icon"
            />
          </div>
          <div className="flex flex-col gap-1 text-[#1C1C1C]">
            <h3 className="text-[1rem] font-semibold">
              Ksh {agentStats?.current_balance.toFixed(2)}
            </h3>
            <p className="text-[.75rem]">Current Balance</p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Statistics;
