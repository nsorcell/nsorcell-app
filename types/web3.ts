import { LOTTERY_6 } from "config/contract-addresses"

export type ChainId = keyof typeof LOTTERY_6

export enum LotteryEvents {
  DRAW = "Lottery6__Draw",
  ENTER = "Lottery6__Enter",
  NO_WINNERS = "Lottery6__NoWinners",
  REQUESTED_DRAW = "Lottery6__RequestedDraw",
  WINNERS = "Lottery6__Winners",
}
