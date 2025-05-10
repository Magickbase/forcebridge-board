"use client"

import Link from 'next/link'
import { CartesianGrid, XAxis, Area, AreaChart, } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BigNumber } from "bignumber.js"
import { ValueType } from "recharts/types/component/DefaultTooltipContent"
import { formatAmount } from '@/lib/utils'

export const description = "An interactive bar chart"

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export interface Data {
  timestamp: number
  value: number
}


const CustomChart = ({ list, token }: { list: Array<Data>, token: { logo: string, symbol: string, decimal: number, args: string } }) => {
  const formattedList = list.map((item) => ({
    ...item,
    value: formatAmount(item.value, token.decimal),
  }))

  const total = formattedList[formattedList.length - 1]

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>
            <img src={token.logo.replace('https://cryptologos.cc', '')} alt={token.symbol} width={24} height={24} className="mr-2 inline-block h-6 w-6" />
            {token.symbol}</CardTitle>
          <CardDescription>
            <span>Find More information about <b>{token.symbol}</b> on <Link className="underline font-bold" href={`https://explorer.nervos.org/sudt/${token.args}`} target="_blank" rel="noopener noreferrer">CKB Explorer</Link>

            </span>
          </CardDescription>
        </div>
        <div className="flex">
          <button
            className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
          >
            <span className="text-xs text-muted-foreground">
              Latest
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {BigNumber(total.value).toFormat()}
            </span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={formattedList}>
            <defs>
              <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value: ValueType, _, i, __, p: any) => {
                    if (typeof value === 'string') {
                      return <div className="border-l-2 border-dotted pl-2 flex flex-col">
                        <div>{new Date(p.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}</div>
                        <div className="flex gap-4">
                          <span className="text-muted-foreground">Amount</span>

                          <span>
                            {BigNumber(value).toFormat()}
                          </span>

                        </div>
                      </div>
                    }
                    return value
                  }}
                  indicator="dashed"
                />
              }
            />
            <Area
              dataKey="value"
              type="natural"
              fill="url(#fillValue)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />

          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default CustomChart
