"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Cell, Label, Pie, PieChart } from "recharts";

import { CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const COLORS = [
  "var(--chart)",
  "var(--chart-1)",
  "var(--primary-ring)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];
export function ExpensePieChart({ pieChartData }) {
  const chartConfig = React.useMemo(() => {
    const config = {
      value: { label: "Amount" },
    };

    pieChartData.forEach((item, index) => {
      config[item.name] = {
        label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
        color: COLORS[index % COLORS.length],
      };
    });
    return config;
  }, [pieChartData]);

  const totalAmount = React.useMemo(() => {
    return pieChartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [pieChartData]);

  if (!pieChartData || pieChartData.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center text-muted-foreground italic">
        Ready to visualize your success! Add your first transaction. 🌱
      </div>
    );
  }

  return (
    <div>
      <div className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
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
                          {totalAmount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Spent
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      <div className="flex items-center justify-center mt-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground leading-none">
          <span>
            Tracking your expenses across {pieChartData.length} categories.
          </span>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
      </div>
    </div>
  );
}
