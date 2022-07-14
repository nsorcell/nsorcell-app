import { Web3Provider } from "@ethersproject/providers"
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit"
import { ChainId } from "types/web3"

const CONNECT = "web3/connect"
export const connect = createAction<Web3State, typeof CONNECT>(CONNECT)

const DISCONNECT = "web3/disconnect"
export const disconnect = createAction<undefined, typeof DISCONNECT>(DISCONNECT)

const TOGGLE_WAIT_FOR_TRANSACTION = "web3/toggleWaitForApproval"
export const toggleWaitForApproval = createAction<
  undefined,
  typeof TOGGLE_WAIT_FOR_TRANSACTION
>(TOGGLE_WAIT_FOR_TRANSACTION)

export interface Web3State {
  account: string
  chainId: ChainId
  provider: Web3Provider | null
  waitingForApproval?: boolean
}

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
