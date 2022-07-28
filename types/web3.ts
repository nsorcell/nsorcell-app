import "@nsorcell/protocol"
import { REGISTRY } from "config/contract-addresses"

export type ChainId = keyof typeof REGISTRY | 0

export enum LotteryEvents {
  DRAW = "Lottery6__Draw",
  ENTER = "Lottery6__Enter",
  RESULTS = "Lottery6__Results",
  REQUESTED_DRAW = "Lottery6__RequestedDraw",
}
