import { createReducer, createSlice } from "@reduxjs/toolkit"
import { Lottery6State } from "types/store"
import { fetchStatsReceived } from "./actions"

const initialState: Lottery6State = {
  isLoaded: false,
  players: [],
  history: [],
  state: "INITIAL",
  lastDraw: 0,
  numberOfDraws: 0,
  prizePool: "0",
  drawInterval: 0,
}

const lottery6Slice = createSlice({
  name: "lottery6",
  initialState,
  reducers: {
    fetchStatsReceived: createReducer(initialState, (build) =>
      build.addCase(fetchStatsReceived, (_, { payload }) => payload)
    ),
  },
})

export default lottery6Slice
