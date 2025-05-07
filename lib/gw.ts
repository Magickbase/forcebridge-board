import { GW_V0_SCRIPT, GW_V1_SCRIPT } from '@/lib/const'

export const isGwV0 = (script: Record<'code_hash' | 'hash_type' | 'args', string>) => {
  return script.code_hash === GW_V0_SCRIPT.CODE_HASH && script.hash_type === GW_V0_SCRIPT.HASH_TYPE && script.args === GW_V0_SCRIPT.ARGS
}


export const isGwV1 = (script: Record<'code_hash' | 'hash_type' | 'args', string>) => {
  return script.code_hash === GW_V1_SCRIPT.CODE_HASH && script.hash_type === GW_V1_SCRIPT.HASH_TYPE && script.args === GW_V1_SCRIPT.ARGS
}
