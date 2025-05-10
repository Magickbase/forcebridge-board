import BigNumber from "bignumber.js"
import type { History } from "./load-history"

interface Report {
  timestamp: {
    start: number,
    end: number
  },
  diff: Record<string, {
    total: BigNumber,
    addrs: BigNumber,
  }>
}

export const generateBiweeklyReports = (history: Array<History>) => {

  if (history.length === 0) return []

  const samples: Array<History> = [history[0]]

  const TWO_WEEKS = 14 * 24 * 60 * 60 * 1000

  for (const item of history) {
    const last = samples[samples.length - 1]
    if (item.timestamp > last.timestamp + TWO_WEEKS) {
      samples.push(item)
    }
  }
  const reports: Array<Report> = []

  samples.slice(1).forEach((cur, idx) => {

    const prev = samples[idx]
    const report: Report = {
      timestamp: {
        start: prev.timestamp,
        end: cur.timestamp,
      },
      diff: {}
    }

    prev.data.forEach((prevToken) => {
      const curToken = cur.data.find(i => i.token === prevToken.token)
      const diffTotal = BigNumber(curToken?.total ?? 0).minus(prevToken.total)
      const diffAddrs = BigNumber(curToken?.addrs ?? 0).minus(prevToken.addrs)

      if (diffTotal.isZero()) return

      report.diff[prevToken.token] = {
        total: diffTotal,
        addrs: diffAddrs,
      }
    })
    if (Object.keys(report.diff).length === 0) return
    reports.push(report)
  })

  return reports
}
