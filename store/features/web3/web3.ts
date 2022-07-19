import { createReducer, createSlice } from "@reduxjs/toolkit"
import { Web3State } from "types/store"
import { initialChainId, initialProvider } from "utils/rpc"
import {
  addressesReceived,
  connect,
  disconnect,
  switchChain,
  toggleWaitForApproval,
} from "./actions"

const initialState: Web3State = {
  account: "",
  chainId: initialChainId(),
  provider: initialProvider(),
  waitingForApproval: false,
  addresses: {
    lottery6: "",
  },
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
    switchChain: createReducer(initialState, (build) =>
      build.addCase(switchChain, (state, { payload }) => {
        state.chainId = payload
      })
    ),
    addressesReceived: createReducer(initialState, (build) =>
      build.addCase(addressesReceived, (state, { payload }) => {
        state.addresses = payload
      })
    ),
  },
})

export default ethersSlice
