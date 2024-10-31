"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaPhotoVideo } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { PiBooks } from "react-icons/pi";
import { PiExam } from "react-icons/pi";
import { IoVideocamOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { AiOutlineRise } from "react-icons/ai";
import { CiHome } from "react-icons/ci";
import { IoMdPeople } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopAgentTable, TopItemsTable, TopRegionsTable } from "../tables";
import { RevenueDist } from "../charts/revenue_pie_charts";
import { RevenuePerMedia } from "../charts/revenue_per_type";
import {
  useGetDashboardStats,
  useGetProductStats,
} from "@/hooks/api/useDashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFinancesStats } from "@/hooks/api/useFinances";
import { to2dp } from "../inputs";
import { IDashboardStats } from "@/lib/types/data.types";
import { CustomBasicTableSkeleton } from "../tables/shared";

export const Homepage = () => {
  const { data: stats, isPending } = useGetDashboardStats();

  return (
    <div className="mt-5 grid grod-col-1 gap-3 ">
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3">
        <RevenueCard />
        <div className="fx-col gap-3">
          <SCards
            icon={IoHomeOutline}
            title="Total Agents"
            value={stats?.total_agents || 0}
            valueIncrease={`+${stats?.agents_today} Agents Today`}
            isPending={isPending}
          />
          <SCards
            icon={IoMdPeople}
            title="Total Customers"
            value={stats?.total_customers || 0}
            valueIncrease={`+${stats?.customers_today} Customers Today`}
            isPending={isPending}
          />
        </div>
        <Tables stats={stats} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <RevenueCardPie />
        <RevenuePerMedia />
      </div>
    </div>
  );
};

const Info: React.FC<{
  icon: IconType;
  title: string;
  value: string | number;
}> = ({ icon, title, value }) => {
  const Icon = icon;
  return (
    <div className="fx--c justify-between">
      <div className="fx--c gap-2">
        <Icon size={20} />
        <p className="font-[500]">{title}</p>
      </div>
      <p className="">{value}</p>
    </div>
  );
};
const RevenueCard = () => {
  const { data: md, isPending: md_pending } = useGetProductStats();
  const { data: stats, isPending } = useGetDashboardStats();

  return md_pending ? (
    <CardSkeleton />
  ) : (
    <Card className="w-full fx-c-c fx-col ">
      <CardHeader className="w-full fx-c-c py-5">
        <CardTitle className="font-bold">
          KES. {to2dp(stats?.cumulative_revenue || 0)}
        </CardTitle>
        <CardDescription>Cumulative Revenue</CardDescription>
      </CardHeader>
      <CardContent className="fx-col gap-3 w-full">
        <Info
          icon={IoVideocamOutline}
          title="Videos"
          value={md?.video_count || 0}
        />
        <Info icon={PiBooks} title="Books" value={md?.books_count || 0} />
        <Info icon={PiExam} title="Exams" value={md?.exams_count || 0} />
      </CardContent>
    </Card>
  );
};

const SCards: React.FC<{
  icon: IconType;
  title: string;
  value: number;
  valueIncrease: string;
  isPending: boolean;
}> = (props) => {
  const Icon = props.icon;
  return (
    <Card className="w-full">
      <CardContent className="fx p-4 gap-4 w-full  ">
        {props.isPending ? (
          <div className="fx p-4 gap-4 w-full  ">
            <div className="flex gap-4 w-full">
              <Skeleton className="rounded-full bg-foreground/10 w-[50px] h-[50px] max-w-[50px] max-h-[50px]" />
              <div className="flex flex-col gap-2 flex-grow">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-8 w-[120px]" />
                <Skeleton className="h-[30px] w-[80px]" />
              </div>
            </div>
          </div>
        ) : (
          <div className="fx gap-4 w-full  ">
            <span className="rounded-full bg-foreground/10 dark:bg-foreground/90 w-[50px] h-[50px] max-w-[50px] max-h-[50px] fx-c-c ">
              <Icon className="text-secondary dark:text-background text-lg " />
            </span>
            <div className="fx-col gap-2 ">
              <p className="">{props.title}</p>
              <h1 className="dts4 font-semibold">{props.value}</h1>
              <Button className="bg-third/10  fx  text-third px-2 h-[30px] w-min gap-1">
                <AiOutlineRise size={16} />
                <span className="text-sm">{props.valueIncrease}</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const Tables = ({ stats }: { stats?: IDashboardStats }) => {
  return (
    <Card className=" overflow-hidden">
      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="w-full bg-card border-b rounded-none py-6">
          <TabsTrigger value="agents">Top Agents</TabsTrigger>
          <TabsTrigger value="regions">Top Regions</TabsTrigger>
          <TabsTrigger value="items">Top Items</TabsTrigger>
        </TabsList>
        <TabsContent value="agents" className="w-full">
          {!stats ? (
            <CustomBasicTableSkeleton columnsCount={2} rowsCount={5} />
          ) : (
            <TopAgentTable agentStats={stats.top_statistics.top_agents} />
          )}
        </TabsContent>
        <TabsContent value="regions" className="w-full">
          {!stats ? (
            <CustomBasicTableSkeleton columnsCount={2} rowsCount={5} />
          ) : (
            <TopRegionsTable top_regions={stats.top_statistics.top_regions} />
          )}
        </TabsContent>
        <TabsContent value="items" className="w-full">
          {!stats ? (
            <CustomBasicTableSkeleton columnsCount={2} rowsCount={5} />
          ) : (
            <TopItemsTable top_products={stats.top_statistics.top_products} />
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

const RevenueCardPie = () => {
  return <RevenueDist />;
};

const InfoSkeleton = () => (
  <div className="flex items-center gap-3">
    <div className="fx--c gap-1 flex-grow ">
      <Skeleton className="w-6 h-6 rounded-full" />
      <Skeleton className="h-4 w-20" />
    </div>
    <div className="flex flex-col gap-1 ">
      <Skeleton className="h-4 w-12" />
    </div>
  </div>
);

const CardSkeleton = () => {
  return (
    <Card className="w-full flex flex-col items-center justify-center">
      <CardHeader className="w-full flex flex-col items-center justify-center py-5">
        <Skeleton className="h-7 w-32 mb-2" />
        <Skeleton className="h-4 w-40" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3 w-full">
        <InfoSkeleton />
        <InfoSkeleton />
        <InfoSkeleton />
      </CardContent>
    </Card>
  );
};
