import CKB from '@nervosnetwork/ckb-sdk-core'

import { NODE_URL } from './const'

export const ckb = new CKB(NODE_URL)
