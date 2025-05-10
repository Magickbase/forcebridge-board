import { loadHistory } from '@/lib/load-history'
import Chart from './chart'
import tokens from '@/data/tokens.json' assert { type: 'json' }
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 3600 // revalidate every hour

export default function Home() {
  const data = loadHistory()
  const tokenIds = data[0]?.data.map(i => i.token) ?? []



  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-6xl">
        {tokenIds.map(tokenId => {
          const token = tokens.find(t => t.args === tokenId)
          if (!token) return

          const list = data.map(i => {
            const tokenData = i.data.find(t => t.token === tokenId)
            return {
              timestamp: i.timestamp,
              value: Number(tokenData?.total ?? 0),
            }
          })

          return (
            <div
              key={tokenId}
              className="flex flex-col gap-[16px] w-full max-w-6xl"
            >
              <div className="w-full">
                <Chart list={list} token={token} />
              </div>
            </div>
          )
        })}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-sm text-gray-500">
          Built with ❤️  by <Link className='underline' href="https://magickbase.com">Magickbase</Link>
        </p>
      </footer>
    </div>
  )
}
