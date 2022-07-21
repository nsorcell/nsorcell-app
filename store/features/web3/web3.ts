import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import { Web3State } from "types/store"
import {
  connect,
  connectDefault,
  disconnect,
  switchChain,
  toggleWaitForApproval,
} from "./actions"

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
    connectDefault: createReducer(initialState, (build) =>
      build.addCase(connectDefault, (state, { payload }) => ({
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
        state.provider = state.provider
      })
    ),
  },
  extraReducers: {
    [HYDRATE]: (state: any = {}, action: PayloadAction) => {
      if (action.type === HYDRATE) {
        return {
          ...state,
          //@ts-ignore
          chainId: action.payload.web3.chainId,
        }
      }

      return state
    },
  },
})

export default ethersSlice
