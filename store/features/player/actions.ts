import { createAction } from "@reduxjs/toolkit"
import { PlayerState } from "types/store"

const FETCH_PLAYER_DATA = "player/fetchPlayerData"
export const fetchPlayerData = createAction<
  undefined,
  typeof FETCH_PLAYER_DATA
>(FETCH_PLAYER_DATA)

const PLAYER_DATA_RECEIVED = "player/playerDataReceived"
export const playerDataReceived = createAction<
  PlayerState,
  typeof PLAYER_DATA_RECEIVED
>(PLAYER_DATA_RECEIVED)
