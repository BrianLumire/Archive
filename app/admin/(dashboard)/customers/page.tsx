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
import { CustomersOnPlatform } from "@/components/dashboard/tables";
import {
  useGetCusomerStatistics,
  useGetCustomers,
} from "@/hooks/api/useCustomers";
const Customers = () => {
  const { data, isPending } = useGetCusomerStatistics();

  return (
    <div className="px-4 fx-col gap-4">
      <PageDetails />
      <StatCardContainer />
      <CustomersOnPlatform />
    </div>
  );
};
const StatCardContainer = () => {
  const { data: cs, isPending } = useGetCusomerStatistics();
  const start_cards_details = [
    {
      name: isPending ? "..." : cs?.customers_number,
      description: "Customers on Platform",
      icon: FaRegUser,
    },
    {
      name: isPending ? "..." : cs?.occupied_regions,
      description: "Occupied Counties",
      icon: CiLocationOn,
    },
    {
      name: isPending ? "..." : cs?.purchased_products,
      description: "Items Purchased",
      icon: LuShoppingCart,
    },
    {
      name: "0",
      description: "Inactive Customers",
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
        <h5 className="dts3 font-bold">Dashboard</h5>
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
                  <Link href="/admin/customers">Customers</Link>
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

export default Customers;
