"use client"

import * as React from "react"
import { Label, Pie, PieChart, Tooltip } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
} from "@/components/ui/chart"

// Original data
const chartData = [
    { browser: "Total Revenue", visitors: 1200000, fill: "#098637", type: "revenue" },
    { browser: "Gross Profit", visitors: 800000, fill: "#125427", type: "revenue" },
    { browser: "Average Order Value (AOV)", visitors: 3500, fill: "#0e2014", type: "average" },
    { browser: "Conversion Rate", visitors: 75, fill: "#113b1d", type: "percentage" },
    { browser: "Sales Growth Rate", visitors: 40, fill: "#106a2e", type: "percentage" },
]

// Normalize data based on type
const normalizedData = chartData.map((item) => {
    if (item.type === "revenue") {
        return { ...item, visitors: item.visitors / 10000 }; // Normalize revenue by dividing by 10,000
    }
    return item; // Keep percentages and averages as-is
});

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    totalRevenue: {
        label: "Total Revenue",
        color: "#098637",
    },
    grossProfit: {
        label: "Gross Profit",
        color: "#125427",
    },
    aov: {
        label: "Average Order Value",
        color: "#0e2014",
    },
    conversionRate: {
        label: "Conversion Rate",
        color: "#113b1d",
    },
    salesGrowth: {
        label: "Sales Growth Rate",
        color: "#106a2e",
    },
} satisfies ChartConfig

export default function SalesPerformance() {
    const totalVisitors = React.useMemo(() => {
        return normalizedData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    return (
        <Card className="h-80 w-80 flex flex-col bg-black text-white">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-white">Sales Performance</CardTitle>
                <CardDescription className="text-white">Dec 2024 - Feb 2025</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <Tooltip
                            content={({ payload }) => {
                                if (payload && payload.length > 0) {
                                    const data = payload[0].payload;
                                    let value = data.visitors;
                                    if (data.type === "revenue") {
                                        value = data.visitors * 10000; // Revert normalization for display
                                    }
                                    return (
                                        <div className="bg-white text-black p-2 rounded shadow">
                                            <p>{data.browser}: {value.toLocaleString()}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Pie
                            data={normalizedData}
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
                                                    Total
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
            
        </Card>
    )
}