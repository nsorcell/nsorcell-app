import { createAction } from "@reduxjs/toolkit"
import { Web3State } from "types/store"
import { ChainId } from "types/web3"

const CONNECT = "web3/connect"
export const connect = createAction<Web3State, typeof CONNECT>(CONNECT)

const DISCONNECT = "web3/disconnect"
export const disconnect = createAction<undefined, typeof DISCONNECT>(DISCONNECT)

const INITIATE_SWITCH_CHAIN = "web3/initiateSwitchChain"
export const initiateSwitchChain = createAction<
  ChainId,
  typeof INITIATE_SWITCH_CHAIN
>(INITIATE_SWITCH_CHAIN)

const SWITCH_CHAIN = "web3/switchChain"
export const switchChain = createAction<ChainId, typeof SWITCH_CHAIN>(
  SWITCH_CHAIN
)

export const ACTION_FAILED = "web3/actionFailed"
export const actionFailed = createAction<
  { reason: string },
  typeof ACTION_FAILED
>(ACTION_FAILED)

const TOGGLE_WAIT_FOR_TRANSACTION = "web3/toggleWaitForApproval"
export const toggleWaitForApproval = createAction<
  undefined,
  typeof TOGGLE_WAIT_FOR_TRANSACTION
>(TOGGLE_WAIT_FOR_TRANSACTION)
