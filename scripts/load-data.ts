import path from 'node:path'
import fs from 'node:fs'
import Papa from 'papaparse'
import { ckb } from '@/lib/ckb'
import tokens from '@/data/tokens.json'  assert { type: 'json'}
import { SUDT_SCRIPT } from '@/lib/const'
import { getCells } from '@/lib/load-cells'
import { isGwV0, isGwV1 } from '@/lib/gw'


const main = async () => {
  const list = []

  for (const token of tokens) {
    const typeScript = {
      code_hash: SUDT_SCRIPT.CODE_HASH,
      hash_type: SUDT_SCRIPT.HASH_TYPE,
      args: token.args
    }
    let cursor = null
    const count = {
      total: 0n,
      gw: {
        v0: 0n,
        v1: 0n
      }
    }
    while (true) {
      const cells = await getCells(typeScript, cursor)
      if (!cells) {
        // TODO: handle error
        break
      }

      for (const cell of cells.objects) {
        const value = BigInt(ckb.utils.toBigEndian(cell.output_data))
        count.total += value
        if (isGwV0(cell.output.lock)) {
          count.gw.v0 += value
        } else if (isGwV1(cell.output.lock)) {
          count.gw.v1 += value
        }
      }

      if (cells.last_cursor === '0x') {
        break
      }
      cursor = cells.last_cursor
    }
    const data = {
      token: token.args,
      total: count.total.toString(),
      gw_v0: count.gw.v0.toString(),
      gw_v1: count.gw.v1.toString()
    }
    list.push(data)
  }

  const csv = Papa.unparse(list)
  const time = Date.now()
  const FILE_PATH = path.join(__dirname, '..', 'data', 'history', `${time}.csv`)
  fs.writeFileSync(FILE_PATH, csv)
  console.info(`${time}.csv done`)
}

main()

