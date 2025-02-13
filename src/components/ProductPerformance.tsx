"use client"
import { GitCommitVertical } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
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
  { category: "Hoodies", inStock: 186, sold: 80 },
  { category: "Casuals", inStock: 305, sold: 200 },
  { category: "Shirts", inStock: 237, sold: 120 },
  { category: "Suits", inStock: 73, sold: 190 },
  { category: "Shorts", inStock: 209, sold: 130 },
  { category: "Office Suits", inStock: 214, sold: 140 },
]

const chartConfig = {
  inStock: {
    label: "In Stock",
    color: "#106a2e", // Highlight green color
  },
  sold: {
    label: "Sold",
    color: "white",
  },
} satisfies ChartConfig

export function ProductPerformance() {
  return (
    <Card className="md:w-[40vw] bg-black text-white">
      <CardHeader>
        <CardTitle className="text-white">Product Category Performance</CardTitle>
        <CardDescription className="text-gray-400">Current Stock vs Sales</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} stroke="#333333" />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="white"
              tick={{ fill: 'white' }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="inStock"
              type="natural"
              stroke="#106a2e"
              strokeWidth={2}
              dot={({ cx, cy, payload }) => {
                const r = 24
                return (
                  <GitCommitVertical
                    key={payload.category}
                    x={cx - r / 2}
                    y={cy - r / 2}
                    width={r}
                    height={r}
                    fill="black"
                    stroke="#106a2e"
                  />
                )
              }}
            />
            <Line
              dataKey="sold"
              type="natural"
              stroke="white"
              strokeWidth={2}
              dot={({ cx, cy, payload }) => {
                const r = 24
                return (
                  <GitCommitVertical
                    key={payload.category}
                    x={cx - r / 2}
                    y={cy - r / 2}
                    width={r}
                    height={r}
                    fill="black"
                    stroke="white"
                  />
                )
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}

export default ProductPerformance;