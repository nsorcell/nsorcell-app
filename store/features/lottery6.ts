import { createAction, createReducer, createSlice } from "@reduxjs/toolkit"
import { LuckyNumbers } from "components/lottery/types"
import id from "ramda/src/identity"

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

export interface Lottery6State {}

const initialState: Lottery6State = {}

const lottery6Slice = createSlice({
  name: "lottery6",
  initialState,
  reducers: {
    enter: createReducer(initialState, (build) => build.addCase(enter, id)),
  },
})

export default lottery6Slice
