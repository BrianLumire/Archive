"use client";

import * as React from "react";
import { ChartConfig } from "@/components/ui/chart";
import { PieChartCard } from "./custom_compund";
import { useGetFinancesStats } from "@/hooks/api/useFinances";
import { useGetDashboardStats } from "@/hooks/api/useDashboard";
import { to2dp } from "../inputs";

const chartConfig = {
  value: {
    label: "Value",
  },
  platform_revenue: {
    label: "Platform Revenue",
    color: "hsl(var(--chart-1))",
  },
  paid_to_agents: {
    label: "Paid to Agents",
    color: "hsl(var(--chart-2))",
  },
  pending_payout: {
    label: "Pending Payout",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;
export function RevenueDist() {
  const { data: stats, isPending } = useGetDashboardStats();
  const chartData = [
    {
      title: "platform_revenue",
      value: to2dp(stats?.revenue_distribution?.platform_revenue || 0),
      fill: "hsl(var(--chart-1))",
    },
    {
      title: "paid_to_agents",
      value: to2dp(stats?.revenue_distribution?.paid_to_agents_total || 0),
      fill: "hsl(var(--chart-2))",
    },
    {
      title: "pending_payout",
      value: to2dp(stats?.revenue_distribution?.pending_disbursements || 0),
      fill: "hsl(var(--chart-3))",
    },
  ];
  const totalValue = React.useMemo(() => {
    if (!stats) {
      return 0;
    }
    return (
      stats?.revenue_distribution?.platform_revenue +
      stats?.revenue_distribution?.paid_to_agents_total +
      stats?.revenue_distribution?.pending_disbursements
    );
  }, [stats]);
  return (
    <PieChartCard
      chartConfig={chartConfig}
      data={chartData}
      isPending={isPending}
      title="Revenue Distribution (Ksh)"
      totalValue={totalValue}
      pieProps={{
        cornerRadius: 5,
        innerRadius: 40,
      }}
    />
  );
}
