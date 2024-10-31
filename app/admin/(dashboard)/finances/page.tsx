"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarButton } from "@/components/dashboard/pageUis/shared";
import { CiExport } from "react-icons/ci";
import {
  Stat_Card,
  StatCardWrapper,
} from "@/components/dashboard/cards/stat_cards";
import { CircleDollarSign } from "lucide-react";
import { FaMoneyBill, FaPersonBooth } from "react-icons/fa";
import { MdOutlinePaid, MdOutlinePendingActions } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  AgentEarnings,
  PaymentToAgent,
  Transaction_Sales_Income,
} from "@/components/dashboard/tables";
import { useGetFinancesStats } from "@/hooks/api/useFinances";
import { Separator } from "@/components/ui/separator";

const Finances = () => {
  return (
    <div className="px-4 fx-col gap-4">
      <PageDetails />
      <StatCardContainer />
      <FinancesTables />
    </div>
  );
};
const StatCardContainer = () => {
  const { data: stats, isPending } = useGetFinancesStats();
  const toFixed = (num?: number) => `Ksh ${Math.ceil(num || 0)}`;
  const start_cards_details = [
    {
      name: isPending ? "..." : `${toFixed(stats?.purchases_revenue)}`,
      description: "Purchases Revenue",
      icon: CircleDollarSign,
    },
    {
      name: isPending ? "..." : ` ${toFixed(stats?.commission_total)}`,
      description: "Total Commissions",
      icon: FaPersonBooth,
    },
    {
      name: isPending ? "...." : `${toFixed(stats?.paid_to_agents_total)}`,
      description: "Paid To Agents",
      icon: MdOutlinePaid,
    },
    {
      name: isPending ? "..." : `${toFixed(stats?.pending_disbursements)}`,
      description: "Pending Disbursement",
      icon: MdOutlinePendingActions,
    },
  ];
  return (
    <StatCardWrapper title="Workers on Platform">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {start_cards_details.map((card, index) => (
          <Stat_Card
            key={index}
            title={card.name}
            description={card.description}
            icon={card.icon}
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
                  <Link href="/admin/finances">Finances</Link>
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

const FinancesTables = () => {
  return (
    <Card className="pt-4">
      <Tabs defaultValue="agents" className="w-full">
        <div className="fx-btw px-2 border-b ">
          <TabsList className="bg-none w-full fx justify-start  ">
            <TabsTrigger value="agents">Agents Earnings</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          {/* <Button size={"sm"} className="rpx gap-1">
            <FaMoneyBill size={18} />
            <span>Export</span>
          </Button> */}
        </div>
        <TabsContent value="agents">
          <AgentEarnings />
        </TabsContent>
        <TabsContent value="transactions">
          <TransactionsTabs />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

const TransactionsTabs = () => {
  return (
    <Tabs defaultValue="sales_income" className="w-full">
      <TabsList className="bg-none w-full fx justify-start  ">
        <TabsTrigger btnbg value="sales_income">
          Sales Income
        </TabsTrigger>
        <TabsTrigger btnbg value="payment_to_agent">
          Payment To Agent
        </TabsTrigger>
      </TabsList>

      <Separator className="mt-2" />
      <TabsContent value="sales_income">
        <Transaction_Sales_Income />
      </TabsContent>
      <TabsContent value="payment_to_agent">
        <PaymentToAgent />
      </TabsContent>
    </Tabs>
  );
};
export default Finances;
