import type { JsonRpcProvider, Web3Provider } from "@ethersproject/providers"
import { ChainId } from "./web3"

export type History = Record<
  number,
  { winningNumbers: number[]; winners: string[] }
>

export interface Web3State {
  account: string
  chainId: ChainId
  provider: Web3Provider | JsonRpcProvider
  addresses: {
    lottery6: string
  }
  waitingForApproval?: boolean
}

export type LotteryState = "STANDBY" | "OPEN" | "DRAWING" | "CALCULATING"

export interface Lottery6State {
  players: string[]
  history: History
  state: LotteryState | "INITIAL"
  lastDraw: number
  numberOfDraws: number
  prizePool: string
  drawInterval: number
}
