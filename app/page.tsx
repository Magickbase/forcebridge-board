import { loadHistory } from '@/lib/load-history'
import tokens from '@/data/tokens.json' assert { type: 'json' }
import Timeline from '@/components/ui/timeline'
import { generateBiweeklyReports } from '@/lib/report'
import { cn, formatAmount } from '@/lib/utils'
import { BigNumber } from 'bignumber.js'
import Link from 'next/link'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { LinkPreview } from '@/components/ui/link-preview'

export const dynamic = 'force-static'
export const revalidate = 3600 // revalidate every hour

export default function Home() {
  const data = loadHistory()
  const reports = generateBiweeklyReports(data)

  const updates: Array<{
    title: React.ReactNode,
    content: React.ReactNode,
  }> = reports.map(r => {
    const startDate = new Date(r.timestamp.start)
    const endDate = new Date(r.timestamp.end)

    const diff = Object.entries(r.diff).map(([token, { total, addrs }]) => {
      const tokenInfo = tokens.find(t => t.args === token)
      if (!tokenInfo) return null

      const totalBN = new BigNumber(total)
      const addrsBN = new BigNumber(addrs)
      const isTotalZero = totalBN.isZero()
      const isAddrsZero = addrsBN.isZero()
      const isTotalPositive = totalBN.isGreaterThan(0)
      const isAddrsPositive = addrsBN.isGreaterThan(0)

      return (
        <div key={token} className="flex flex-col gap-2 p-4 rounded-lg bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <img
              src={tokenInfo.logo.replace('https://cryptologos.cc', '')}
              alt={tokenInfo.symbol}
              className="w-5 h-5 rounded-full"
            />
            <span className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {tokenInfo.symbol}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Amount:</span>
              <span className={cn(
                `text-sm font-medium`,
                isTotalPositive && 'text-green-500',
                !isTotalZero && !isTotalPositive && 'text-red-500',
                isTotalZero && 'text-neutral-500',
              )}>
                {!isTotalZero && isTotalPositive ? '+' : ''}{BigNumber(formatAmount(total, tokenInfo.decimal)).toFormat()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Addresses:</span>
              <span className={cn(`text-sm font-medium`,
                `text-sm font-medium`,
                isAddrsPositive && 'text-green-500',
                !isAddrsZero && !isAddrsPositive && 'text-red-500',
                isAddrsZero && 'text-neutral-500',)
              }>
                {!isAddrsZero && isAddrsPositive ? '+' : ''}{addrs.toFormat()}
              </span>
            </div>
          </div>
        </div>
      )
    })

    return {
      title: <div className="flex flex-col">
        <span>
          {endDate.toLocaleDateString()}
        </span>
        <small className="text-md text-neutral-300">
          - {startDate.toLocaleDateString()}
        </small>
      </div>,
      content: (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {diff}
          </div>
        </div>
      ),
    }
  }).reverse()

  return (
    <main className="mx-auto py-20 flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-6xl">
      <div
        className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10">
        <div className="max-w-7xl mx-auto py-2">
          <h1 className="text-4xl font-bold text-zinc-700 md:text-6xl mb-4 text-black dark:text-white max-w-4xl">
            Force Bridge Closure
          </h1>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-xl">
            To align with the evolving landscape of the CKB ecosystem, we are sunsetting Force Bridge and Godwoken.
          </p>
          <p className="flex gap-1">
            Please withdraw your assets via
            <LinkPreview className="underline font-bold" imageSrc="/previews/godwoken-bridge-preview.png" isStatic url="https://bridge.godwoken.io/#/v1/">Godwoken Bridge</LinkPreview>
            and
            <LinkPreview className="underline font-bold" imageSrc="/previews/force-bridge-preview.png" isStatic url="https://forcebridge.com/">Force Bridge</LinkPreview>
            before the deadline.
          </p>
          <Link href="/announcement" >
            <InteractiveHoverButton className="rounded-md capitalize my-8">
              Read the full announcement
            </InteractiveHoverButton>
          </Link>
        </div>
        <div>
          <iframe src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=v2%3A2PACX-1vTNj1JOp7z4is5gA-OBqJKOb8mpq3v7bZKI6bzT53W7CD1d5Qt10hE7Owx5TWr6sJ1yJArp2P79l5EV&font=Default&lang=en&initial_zoom=2&width=100%25&height=650" width='100%' height='650'></iframe>
        </div>

        <ul className="list-disc w-min ml-auto text-nowrap">
          <li>
            <div className="flex gap-2 justify-between">
              <b>Godwoken Exit Ends:</b>
              <time dateTime="2025/10/31">Oct 31, 2025</time>
            </div>
          </li>
          <li>
            <div className="flex gap-2 justify-between">
              <b >Force Bridge Exit Ends:</b>
              <time dateTime="2025/11/30" >Nov 30, 2025</time>
            </div>
          </li>
        </ul>

      </div>

      <Timeline data={updates} />
    </main>
  )
}
