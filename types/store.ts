import type { JsonRpcProvider, Web3Provider } from "@ethersproject/providers"
import { LuckyNumbers } from "components/lottery/types"
import { ChainId } from "./web3"

export type History = Record<
  number,
  { winningNumbers: number[]; results: string[][] }
>

export interface Web3State {
  account: string
  chainId: ChainId
  provider: Web3Provider | null
  defaultProvider: JsonRpcProvider | null
  waitingForApproval?: boolean
}

export type LotteryState = "STANDBY" | "OPEN" | "DRAWING" | "CALCULATING"

export interface Lottery6State {
  isLoaded: boolean
  currentPlayerNumbers?: number[]
  players: string[]
  history: History
  state: LotteryState | "INITIAL"
  lastDraw: number
  numberOfDraws: number
  prizePool: string
  drawInterval: number
}

export interface PlayerState {
  numbers?: LuckyNumbers
}

export type SupportedChainList = {
  [keys in ChainId]?: string
}

export interface AddressState {
  lottery6: SupportedChainList
}
