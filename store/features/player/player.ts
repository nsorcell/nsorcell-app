import { createReducer, createSlice } from "@reduxjs/toolkit"
import { PlayerState } from "types/store"
import { playerDataReceived } from "./actions"

const initialState: PlayerState = {}

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playerDataReceived: createReducer(initialState, (build) =>
      build.addCase(playerDataReceived, (_, { payload }) => payload)
    ),
  },
})

export default playerSlice
