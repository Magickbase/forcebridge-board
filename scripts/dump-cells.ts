import path from 'node:path'
import fs from 'node:fs'
import Papa from 'papaparse'
import { ckb } from '@/lib/ckb'
import tokens from '@/data/tokens.json'  assert { type: 'json'}
import { SUDT_SCRIPT } from '@/lib/const'
import { getCells } from '@/lib/load-cells'


const main = async () => {
  const list = []

  for (const token of tokens) {
    const typeScript = {
      code_hash: SUDT_SCRIPT.CODE_HASH,
      hash_type: SUDT_SCRIPT.HASH_TYPE,
      args: token.args
    }
    let cursor = null
    while (true) {
      const cells = await getCells(typeScript, cursor)
      if (!cells) {
        // TODO: handle error
        break
      }

      for (const cell of cells.objects) {
        const value = BigInt(ckb.utils.toBigEndian(cell.output_data))
        if (value <= 0n) {
          continue
        }
        const info = {
          token: token.symbol,
          tx_hash: cell.out_point.tx_hash,
          index: cell.out_point.index,
          type_script_args: cell.output.type.args,
          address: ckb.utils.scriptToAddress({
            codeHash: cell.output.lock.code_hash,
            hashType: cell.output.lock.hash_type as any,
            args: cell.output.lock.args
          }),
          data: cell.output_data,
          amount: value.toString(),
        }
        list.push(info)
      }

      if (cells.last_cursor === '0x') {
        break
      }
      cursor = cells.last_cursor
    }
  }

  const csv = Papa.unparse(list)
  const time = Date.now()
  const FILE_PATH = path.join(__dirname, '..', 'data', 'snapshots', `cells-${time}.csv`)
  fs.writeFileSync(FILE_PATH, csv)
  console.info(`${time}.csv done`)
}

main()
