import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import { AddressState } from "types/store"
import { addressesReceived } from ".//actions"

const initialState: AddressState = {
  lottery6: {},
}

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addressesReceived: createReducer(initialState, (build) =>
      build.addCase(addressesReceived, (_, { payload }) => payload)
    ),
  },
  extraReducers: {
    [HYDRATE]: (state: any = {}, action: PayloadAction) => {
      if (action.type === HYDRATE) {
        //@ts-ignore
        return { ...action.payload.address }
      }

      return state
    },
  },
})

export default addressSlice
