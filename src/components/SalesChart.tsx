"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { date: "2025-01-01", desktop: 222, mobile: 150 },
    { date: "2025-01-02", desktop: 97, mobile: 180 },
    { date: "2025-01-03", desktop: 167, mobile: 120 },
    { date: "2025-01-04", desktop: 242, mobile: 260 },
    { date: "2025-01-05", desktop: 373, mobile: 290 },
    { date: "2025-01-06", desktop: 301, mobile: 340 },
    { date: "2025-01-07", desktop: 245, mobile: 180 },
    { date: "2025-01-08", desktop: 409, mobile: 320 },
    { date: "2025-01-09", desktop: 59, mobile: 110 },
    { date: "2025-01-10", desktop: 261, mobile: 190 },
    { date: "2025-01-11", desktop: 327, mobile: 350 },
    { date: "2025-01-12", desktop: 292, mobile: 210 },
    { date: "2025-01-13", desktop: 342, mobile: 380 },
    { date: "2025-01-14", desktop: 137, mobile: 220 },
    { date: "2025-01-15", desktop: 120, mobile: 170 },
    { date: "2025-01-16", desktop: 138, mobile: 190 },
    { date: "2025-01-17", desktop: 446, mobile: 360 },
    { date: "2025-01-18", desktop: 364, mobile: 410 },
    { date: "2025-01-19", desktop: 243, mobile: 180 },
    { date: "2025-01-20", desktop: 89, mobile: 150 },
    { date: "2025-01-21", desktop: 137, mobile: 200 },
    { date: "2025-01-22", desktop: 224, mobile: 170 },
    { date: "2025-01-23", desktop: 138, mobile: 230 },
    { date: "2025-01-24", desktop: 387, mobile: 290 },
    { date: "2025-01-25", desktop: 215, mobile: 250 },
    { date: "2025-01-26", desktop: 75, mobile: 130 },
    { date: "2025-01-27", desktop: 383, mobile: 420 },
    { date: "2025-01-28", desktop: 122, mobile: 180 },
    { date: "2025-01-29", desktop: 315, mobile: 240 },
    { date: "2025-01-30", desktop: 454, mobile: 380 },
    { date: "2025-02-01", desktop: 165, mobile: 220 },
    { date: "2025-02-02", desktop: 293, mobile: 310 },
    { date: "2025-02-03", desktop: 247, mobile: 190 },
    { date: "2025-02-04", desktop: 385, mobile: 420 },
    { date: "2025-02-05", desktop: 481, mobile: 390 },
    { date: "2025-02-06", desktop: 498, mobile: 520 },
    { date: "2025-02-07", desktop: 388, mobile: 300 },
    { date: "2025-02-08", desktop: 149, mobile: 210 },
    { date: "2025-02-09", desktop: 227, mobile: 180 },
    { date: "2025-02-10", desktop: 293, mobile: 330 },
    { date: "2025-02-11", desktop: 335, mobile: 270 },
    { date: "2025-02-12", desktop: 197, mobile: 240 },
    { date: "2025-02-13", desktop: 197, mobile: 160 },
    { date: "2025-02-14", desktop: 448, mobile: 490 },
    { date: "2025-02-15", desktop: 473, mobile: 380 },
    { date: "2025-02-16", desktop: 338, mobile: 400 },
    { date: "2025-02-17", desktop: 499, mobile: 420 },
    { date: "2025-02-18", desktop: 315, mobile: 350 },
    { date: "2025-02-19", desktop: 235, mobile: 180 },
    { date: "2025-02-20", desktop: 177, mobile: 230 },
    { date: "2025-02-21", desktop: 82, mobile: 140 },
    { date: "2025-02-22", desktop: 81, mobile: 120 },
    { date: "2025-02-23", desktop: 252, mobile: 290 },
    { date: "2025-02-24", desktop: 294, mobile: 220 },
    { date: "2025-02-25", desktop: 201, mobile: 250 },
    { date: "2025-02-26", desktop: 213, mobile: 170 },
    { date: "2025-02-27", desktop: 420, mobile: 460 },
    { date: "2025-02-28", desktop: 233, mobile: 190 },
    { date: "2025-02-29", desktop: 78, mobile: 130 },
    { date: "2025-02-30", desktop: 340, mobile: 280 },
    { date: "2025-02-31", desktop: 178, mobile: 230 },

]

const chartConfig = {
    views: {
        label: "Page Views",
    },
    desktop: {
        label: "Desktop",
        color: "#098637", // Changed to green
    },
    mobile: {
        label: "Mobile",
        color: "#098637", // Changed to green
    },
} satisfies ChartConfig

export default function SalesChart() {
    // ... (keep the useState and useMemo hooks the same)
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("desktop")

    const total = React.useMemo(
        () => ({
            desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
            mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
        }),
        []
    )

    return (
        <Card>
            <CardHeader className="bg-black text-white flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <CardHeader className="flex flex-col justify-between items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardTitle>ACTIVE USERS ON HIPLY</CardTitle>
                        <CardDescription>
                            Showing total (active) visitors for the last 3 months
                        </CardDescription>
                    </div>
                    <div className="flex">
                        {["desktop", "mobile"].map((key) => {
                            const chart = key as keyof typeof chartConfig
                            return (
                                <button
                                    key={chart}
                                    data-active={activeChart === chart}
                                    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                    onClick={() => setActiveChart(chart)}
                                >
                                    <span className="text-xs text-muted-foreground">
                                        {chartConfig[chart].label}
                                    </span>
                                    <span className="text-lg font-bold leading-none sm:text-3xl">
                                        {total[key as keyof typeof total].toLocaleString()}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </CardHeader>
            </CardHeader>
            <CardContent className="w-screen px-2 sm:p-6 bg-black">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid
                            vertical={false}
                            stroke="#ffffff30" // Lighter grid lines
                        />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tick={{ fill: 'white' }} // White text
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px] bg-black text-white border border-gray-800" // Tooltip styling
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        <Bar
                            dataKey={activeChart}
                            fill="#098637" // Direct green color
                            radius={[4, 4, 0, 0]} // Rounded bar tops
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}