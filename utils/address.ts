import { History } from "types/store"

export const shortenAddress = (address: string): string => {
  if (!address) return ""
  return (
    address.slice(0, 6) +
    ".." +
    address.slice(address.length - 4, address.length)
  )
}

export const blockScan = (address: string) =>
  `https://blockscan.com/address/${address}`

export const getPlayerHits = (
  account: string,
  history: History,
  iteration: number
) => {
  const { results } = history[iteration]

  return results.indexOf(results.find((n) => n.includes(account)) ?? [])
}
