import { createAction } from "@reduxjs/toolkit"
import { AddressState } from "types/store"

const ADDRESSES_RECEIVED = "address/addressesReceived"
export const addressesReceived = createAction<
  AddressState,
  typeof ADDRESSES_RECEIVED
>(ADDRESSES_RECEIVED)
