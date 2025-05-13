import type { Metadata } from 'next/types'
import { loadHistory } from '@/lib/load-history'
import Chart from '@/components/chart'
import tokens from '@/data/tokens.json' assert { type: 'json' }
import TokenHero from '@/components/token-hero'

export const dynamic = 'force-static'
export const revalidate = 3600 // revalidate every hour

export const metadata: Metadata = {
  title: 'Godwoken v0 | Force Bridge Sunset Hub',
  description: `Exit Progress of Godwoken v0`
}

export default function Home() {
  const data = loadHistory()
  const tokenIds = data[0]?.data.map((i) => i.token) ?? []

  return (
    <main className="mx-auto py-20 px-4 flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-6xl xl:px-0">
      <div className="mx-auto">
        <TokenHero tokens={tokens.map((t) => t.symbol)} platform="Godwoken v1" />
      </div>
      {tokenIds.map((tokenId) => {
        const token = tokens.find((t) => t.args === tokenId)
        if (!token) return

        const list = data.map((i) => {
          const tokenData = i.data.find((t) => t.token === tokenId)
          return {
            timestamp: i.timestamp,
            value: Number(tokenData?.gw_v1 ?? 0)
          }
        })

        const first = list[0]
        if (!first.value) {
          return null
        }

        return (
          <div key={tokenId} className="flex flex-col gap-[16px] w-full max-w-6xl">
            <div className="w-full">
              <Chart list={list} token={token} />
            </div>
          </div>
        )
      })}
    </main>
  )
}
