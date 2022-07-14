export type History = Record<
  number,
  { winningNumbers: number[]; winners: string[] }
>

export type LotteryState = "OPEN" | "DRAWING" | "CALCULATING"

export interface Lottery6State {
  players: string[]
  history: History
  state: LotteryState
  lastDraw: number
  numberOfDraws: number
  prizePool: string
  drawInterval: number
}
