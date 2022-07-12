import { Web3Provider } from "@ethersproject/providers"
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit"

const CONNECT = "web3/connect"
export const connect = createAction<Web3State, typeof CONNECT>(CONNECT)

const DISCONNECT = "web3/disconnect"
export const disconnect = createAction<undefined, typeof DISCONNECT>(DISCONNECT)

export interface Web3State {
  account: string
  chainId: number
  provider: Web3Provider | null
}

const initialState: Web3State = {
  account: "",
  chainId: -1,
  provider: null,
}

const ethersSlice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    connect: createReducer(initialState, (build) =>
      build.addCase(connect, (_, action) => action.payload)
    ),
    disconnect: createReducer(initialState, (build) =>
      build.addCase(disconnect, (state) => initialState)
    ),
  },
})

export default ethersSlice
