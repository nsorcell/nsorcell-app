import { createAction } from "@reduxjs/toolkit"
import { Web3State } from "types/store"
import { ChainId } from "types/web3"

const CONNECT = "web3/connect"
export const connect = createAction<Partial<Web3State>, typeof CONNECT>(CONNECT)

const CONNECT_DEFAULT = "web3/connectDefault"
export const connectDefault = createAction<
  Partial<Web3State>,
  typeof CONNECT_DEFAULT
>(CONNECT_DEFAULT)

const DISCONNECT = "web3/disconnect"
export const disconnect = createAction<undefined, typeof DISCONNECT>(DISCONNECT)

const EXTERNAL_DISCONNECT = "web3/externalDisconnect"
export const externalDisconnect = createAction<
  undefined,
  typeof EXTERNAL_DISCONNECT
>(EXTERNAL_DISCONNECT)

const INITIATE_SWITCH_CHAIN = "web3/initiateSwitchChain"
export const initiateSwitchChain = createAction<
  ChainId,
  typeof INITIATE_SWITCH_CHAIN
>(INITIATE_SWITCH_CHAIN)

const SWITCH_CHAIN = "web3/switchChain"
export const switchChain = createAction<ChainId, typeof SWITCH_CHAIN>(
  SWITCH_CHAIN
)

const TOGGLE_WAIT_FOR_TRANSACTION = "web3/toggleWaitForApproval"
export const toggleWaitForApproval = createAction<
  undefined,
  typeof TOGGLE_WAIT_FOR_TRANSACTION
>(TOGGLE_WAIT_FOR_TRANSACTION)
