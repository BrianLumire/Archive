"use client";

import * as React from "react";
import { Pie, PieChart, Label } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

// PieDef interface for pie chart customization
interface PieDef {
  cx?: number | string;
  cy?: number | string;
  startAngle?: number;
  endAngle?: number;
  paddingAngle?: number;
  innerRadius?: number | string;
  outerRadius?: number | string;
  cornerRadius?: number | string;
  strokeWidth?: number;
}

// Generalized PieChartCard component
interface PieChartCardProps {
  data: Array<{ title: string; value: number; fill: string }>;
  title: string;
  pieProps?: PieDef;
  chartConfig: ChartConfig;
  totalValue: number;
  showLable?: boolean;
  isPending?: boolean;
}

export function PieChartCard({
  data,
  title,
  pieProps,
  chartConfig,
  totalValue,
  isPending,
  showLable = false,
}: PieChartCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="dts4">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isPending ? (
          <div className="fx gap-1 py-5 justify-center items-center ">
            <div className="">
              <Skeleton className="h-[150px] w-[150px] rounded-full" />
            </div>
            <div className="fx-col gap-2 w-full">
              <Skeleton className="h-[20px] w-full rounded-full" />
              <Skeleton className="h-[20px] w-full rounded-full" />
              <Skeleton className="h-[20px] w-full rounded-full" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center items-center">
              <div className="min-w-[200px] min-h-[200px]">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="title"
                      {...pieProps}
                      //   strokeWidth={pieProps?.strokeWidth ?? 2}
                      //   innerRadius={pieProps?.innerRadius ?? 40}
                      //   outerRadius={pieProps?.outerRadius ?? 80}
                      //   paddingAngle={pieProps?.paddingAngle ?? 5}
                      //   cornerRadius={pieProps?.cornerRadius ?? 10}
                      //   startAngle={pieProps?.startAngle}
                      //   endAngle={pieProps?.endAngle}
                      //   cx={pieProps?.cx}
                      //   cy={pieProps?.cy}
                    >
                      {showLable && (
                        <Label
                          content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                              return (
                                <text
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                >
                                  <tspan
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    className="fill-foreground text-3xl font-bold"
                                  >
                                    {totalValue.toLocaleString()}
                                  </tspan>
                                  <tspan
                                    x={viewBox.cx}
                                    y={(viewBox.cy || 0) + 24}
                                    className="fill-muted-foreground"
                                  >
                                    Total
                                  </tspan>
                                </text>
                              );
                            }
                          }}
                        />
                      )}
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </div>
              <div className="fx-col w-full">
                {data.map(({ title, value, fill }) => (
                  <div
                    key={title}
                    className="flex justify-between items-center w-full"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={cn("w-3 h-3 rounded-full")}
                        style={{ backgroundColor: fill }}
                        aria-hidden="true"
                      />
                      <p className="text-sm capitalize">
                        {title.replace(/_/g, " ")}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      {value.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
