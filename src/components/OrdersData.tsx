"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { browser: "success", visitors: 275, fill: "#098637" },
  { browser: "pending", visitors: 200, fill: "#125427" },
  { browser: "abandoned", visitors: 287, fill: "#0e2014" },
  { browser: "returned", visitors: 173, fill: "#113b1d" },
  { browser: "shipped", visitors: 190, fill: "#106a2e" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  success: {
    label: "Success",
    color: "#098637",
  },
  pending: {
    label: "Pending",
    color: "#125427",
  },
  abandoned: {
    label: "Abandoned",
    color: "#0e2014",
  },
  returned: {
    label: "Returned",
    color: "#113b1d",
  },
  shipped: {
    label: "Shipped",
    color: "#106a2e",
  },
} satisfies ChartConfig

export function OrdersData() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="flex flex-col bg-black text-white">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-white">ORDERS</CardTitle>
        <CardDescription className="text-white">Dec 2024 - Feb 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
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
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-white"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-white"
                        >
                          Order history
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-white">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}