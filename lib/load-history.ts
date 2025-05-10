import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'
import { cwd } from 'process'

const DATA_PATH = path.join(cwd(), 'data', 'history')
type HistoryItem = Record<'token' | 'total' | 'gw_v0' | 'gw_v1' | 'addrs', string>

export interface History {
  timestamp: number
  data: Array<HistoryItem>
}


export function loadHistory(): History[] {
  const files = fs.readdirSync(DATA_PATH)
    .filter(file => file.endsWith('.csv'))

  if (files.length === 0) {
    return []
  }

  const entries: History[] = []

  for (const file of files) {
    const filePath = path.join(DATA_PATH, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    const { data } = Papa.parse<HistoryItem>(fileContent, {
      header: true,
      skipEmptyLines: true
    })

    const timestamp = parseInt(file.replace('.csv', ''))
    entries.push({
      timestamp,
      data
    })
  }

  return entries.sort((a, b) => a.timestamp - b.timestamp)
}

