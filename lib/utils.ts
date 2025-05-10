import BigNumber from "bignumber.js"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatAmount = (value: number | BigNumber, decimal: number) => {
  return BigNumber(value).dividedBy(10 ** decimal).toFixed(2)
}
