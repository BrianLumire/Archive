"use client";

import * as React from "react";
import { ChartConfig } from "@/components/ui/chart";
import { PieChartCard } from "./custom_compund";
import { useGetDashboardStats } from "@/hooks/api/useDashboard";
import { to2dp } from "../inputs";

const chartConfig = {
  value: {
    label: "Value",
  },
  videos: {
    label: "Platform Revenue",
    color: "hsl(var(--chart-1))",
  },
  books: {
    label: "Paid to Agents",
    color: "hsl(var(--chart-2))",
  },
  exams: {
    label: "Pending Payout",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;
export function RevenuePerMedia() {
  const { data: stats, isPending } = useGetDashboardStats();
  const chartData = [
    {
      title: "videos",
      value: to2dp(stats?.revenue_by_media_type.videos_total_revenue || 0),
      fill: "hsl(var(--chart-1))",
    },
    {
      title: "books",
      value: to2dp(stats?.revenue_by_media_type.books_total_revenue || 0),
      fill: "hsl(var(--chart-2))",
    },
    {
      title: "exams",
      value: to2dp(stats?.revenue_by_media_type.exams_total_revenue || 0),
      fill: "hsl(var(--chart-3))",
    },
  ];
  const totalValue = React.useMemo(() => {
    if (!stats) {
      return 0;
    }
    return chartData.reduce((total, item) => total + item.value, 0);
  }, [stats]);
  return (
    <PieChartCard
      chartConfig={chartConfig}
      data={chartData}
      title="Revenue Per Media Type (Ksh)"
      totalValue={totalValue}
      isPending={isPending}
      pieProps={{
        cornerRadius: 0,
        innerRadius: 60,
      }}
    />
  );
}
