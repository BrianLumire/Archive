"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { BarButton } from "@/components/dashboard/pageUis/shared";
import { CiExport } from "react-icons/ci";
import {
  Stat_Card,
  StatCardWrapper,
} from "@/components/dashboard/cards/stat_cards";
import { FaUserSlash } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { AgentsOnPlatform } from "@/components/dashboard/tables/agents_on_platform";
import { useGetAgentsStats } from "@/hooks/api/useAgents";
const Agents = () => {
  return (
    <div className="px-4 fx-col gap-4">
      <PageDetails />
      <StatCardContainer />
      <AgentsOnPlatform />
    </div>
  );
};
const StatCardContainer = () => {
  const { isPending, data: stats } = useGetAgentsStats();
  const start_cards_details = [
    {
      name: isPending ? "..." : stats?.agents_total,
      description: "Mentors on Platform",
      icon: FaRegUser,
    },
    {
      name: isPending ? "..." : stats?.regions_total,
      description: "Occupied Regions",
      icon: CiLocationOn,
    },
    {
      name: isPending ? "..." : stats?.total_referrals,
      description: "Reffered Clients",
      icon: LuShoppingCart,
    },
    {
      name: "0",
      description: "Inactive Mentors",
      icon: FaUserSlash,
    },
  ];
  return (
    <StatCardWrapper title="Customers’ Statistics">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {start_cards_details.map((card, index) => (
          <Stat_Card
            key={index}
            title={card.name}
            description={card.description}
            icon={card.icon}
            iconSize={18}
          />
        ))}
      </div>
    </StatCardWrapper>
  );
};

const PageDetails = () => {
  return (
    <div className="fx-btw">
      <div className="fx flex-col">
        <h5 className="dts3 font-bold">Mentors On Platform</h5>
        <div className="fx--c gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/agents">Mentors</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* <BarButton icon={CiExport} text="Export" /> */}
    </div>
  );
};

export default Agents;
