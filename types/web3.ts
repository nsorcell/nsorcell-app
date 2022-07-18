import { REGISTRY } from "config/contract-addresses"

export type ChainId = keyof typeof REGISTRY

export enum LotteryEvents {
  DRAW = "Lottery6__Draw",
  ENTER = "Lottery6__Enter",
  NO_WINNERS = "Lottery6__NoWinners",
  REQUESTED_DRAW = "Lottery6__RequestedDraw",
  WINNERS = "Lottery6__Winners",
}
