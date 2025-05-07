import fs from 'node:fs'
import path from 'node:path'

const TOKEN_LIST_FILE = 'https://raw.githubusercontent.com/nervosnetwork/force-bridge/f3d7df767eff27b58e58bedd7b0990392ca8066a/configs/all-bridged-tokens.json'

const FILE_PATH = path.join(__dirname, '..', 'data', 'tokens.json')

const main = async () => {
  const tokenList = await fetch(TOKEN_LIST_FILE).then(res => res.json())
  const list = tokenList.map((token: {
    symbol: string
    decimal: number
    sudtArgs: string
    logoURI: string
  }) => ({
    symbol: token.symbol,
    decimal: token.decimal,
    args: token.sudtArgs,
    logo: token.logoURI,
  }))

  if (!fs.existsSync(FILE_PATH)) {
    fs.mkdirSync(path.dirname(FILE_PATH), { recursive: true })
  }
  fs.writeFileSync(FILE_PATH, JSON.stringify(list, null, 2))
}

main()
