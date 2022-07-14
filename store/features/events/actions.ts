import { createAction } from "@reduxjs/toolkit"
import { LuckyNumbers } from "components/lottery/types"

const REQUESTED_DRAW = "events/requestedDraw"
export const requestedDraw = createAction<undefined, typeof REQUESTED_DRAW>(
  REQUESTED_DRAW
)

const NUMBERS_DRAWN = "events/numbersDrawn"
export const numbersDrawn = createAction<
  { winningNumbers: LuckyNumbers },
  typeof NUMBERS_DRAWN
>(NUMBERS_DRAWN)

const PLAYER_ENTERED = "events/playerEntered"
export const playerEntered = createAction<
  { address: string },
  typeof PLAYER_ENTERED
>(PLAYER_ENTERED)

const NO_WINNERS = "events/noWinners"
export const noWinners = createAction<undefined, typeof NO_WINNERS>(NO_WINNERS)

const WINNERS = "events/winners"
export const winners = createAction<{ winners: string[] }, typeof WINNERS>(
  WINNERS
)
