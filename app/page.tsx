import { loadHistory } from '@/lib/load-history'
import tokens from '@/data/tokens.json' assert { type: 'json' }
import Timeline from '@/components/ui/timeline'
import { generateBiweeklyReports } from '@/lib/report'
import { formatAmount } from '@/lib/utils'
import { BigNumber } from 'bignumber.js'

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
              <span className={`text-sm font-medium ${!isTotalZero && (isTotalPositive ? 'text-green-500' : 'text-red-500')}`}>
                {!isTotalZero && isTotalPositive ? '+' : ''}{formatAmount(total, tokenInfo.decimal)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">Addresses:</span>
              <span className={`text-sm font-medium ${!isAddrsZero && (isAddrsPositive ? 'text-green-500' : 'text-red-500')}`}>
                {!isAddrsZero && isAddrsPositive ? '+' : ''}{addrs.toLocaleString()}
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
      <Timeline data={updates} />
    </main>
  )
}
