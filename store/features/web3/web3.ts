import { createReducer, createSlice } from "@reduxjs/toolkit"
import { Web3State } from "types/store"
import { connect, disconnect, toggleWaitForApproval } from "./actions"

const initialState: Web3State = {
  account: "",
  chainId: 1,
  provider: null,
  waitingForApproval: false,
}

const ethersSlice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    connect: createReducer(initialState, (build) =>
      build.addCase(connect, (state, { payload }) => ({
        ...state,
        ...payload,
      }))
    ),
    disconnect: createReducer(initialState, (build) =>
      build.addCase(disconnect, () => initialState)
    ),
    toggleWaitForApproval: createReducer(initialState, (build) =>
      build.addCase(toggleWaitForApproval, (state) => ({
        ...state,
        waitingForApproval: !state.waitingForApproval,
      }))
    ),
  },
})

export default ethersSlice
