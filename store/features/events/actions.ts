import { createAction } from "@reduxjs/toolkit"
import { LuckyNumbers } from "components/lottery/types"
import { Lottery6State } from "types/store"

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

const RESULTS = "events/results"
export const results = createAction<Lottery6State["history"], typeof RESULTS>(
  RESULTS
)

const EVENT_TRIGGERED = "events/eventTriggered"
export const eventTriggered = createAction<any, typeof EVENT_TRIGGERED>(
  EVENT_TRIGGERED
)
