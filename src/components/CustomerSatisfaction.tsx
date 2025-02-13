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
    { browser: "Customer Satisfaction Score", visitors: 92, fill: "#098637" },
    { browser: "Product Reviews and Ratings", visitors: 200, fill: "#125427" },
    { browser: "Churn Rate", visitors: 15, fill: "#0e2014" },
,
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    customerSatisfactionScore: {
        label: "Customer Satisfaction Score",
        color: "#098637",
    },
    productReviewsAndRatings: {
        label: "Product Reviews and Ratings",
        color: "#125427",
    },
    churnRate: {
        label: "Churn Rate",
        color: "#0e2014",
    }
} satisfies ChartConfig

export default function CustomerSatisfaction() {
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => {
            if (curr && typeof curr.visitors === 'number') {
                return acc + curr.visitors;
            }
            return acc;
        }, 0);
    }, [])

    return (
        <Card className="h-80 w-80 flex flex-col bg-black text-white">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-white">Customer Satisfaction KPIs</CardTitle>
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
                                                    92
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-white"
                                                >
                                                    Customer Satisfaction Score
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
