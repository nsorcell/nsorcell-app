import { createAction, createReducer, createSlice } from "@reduxjs/toolkit"
import { LuckyNumbers } from "components/lottery/types"
import { Lottery6State } from "types/store"

const ENTER = "lottery6/enter"
export const enter = createAction<LuckyNumbers, typeof ENTER>(ENTER)

const ENTER_FAILED = "lottery6/enterFailed"
export const enterFailed = createAction<undefined, typeof ENTER_FAILED>(
  ENTER_FAILED
)

const ENTER_SUCCESFUL = "lottery6/enterSuccesful"
export const enterSuccessful = createAction<undefined, typeof ENTER_SUCCESFUL>(
  ENTER_SUCCESFUL
)
const ENTER_CANCELED = "lottery6/enterCanceled"
export const enterCanceled = createAction<undefined, typeof ENTER_CANCELED>(
  ENTER_CANCELED
)

const FETCH_STATS = "lottery6/fetchStats"
export const fetchStats = createAction<undefined, typeof FETCH_STATS>(
  FETCH_STATS
)

const FETCH_STATS_RECEIVED = "lottery6/fetchStatsReceived"
export const fetchStatsReceived = createAction<
  Lottery6State,
  typeof FETCH_STATS_RECEIVED
>(FETCH_STATS_RECEIVED)

const initialState: Lottery6State = {
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
