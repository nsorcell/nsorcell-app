import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import { createEpicMiddleware } from "redux-observable"

import address from "./features/address"
import lottery6 from "./features/lottery6"
import player from "./features/player"
import web3 from "./features/web3/web3"

import rootEpic from "./epics"

const reducer = combineReducers({
  address: address.reducer,
  lottery: lottery6.reducer,
  player: player.reducer,
  web3: web3.reducer,
})

export type State = ReturnType<typeof reducer>

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, State>()

export const initStore = () => {
  const store = configureStore({
    middleware: [epicMiddleware],
    reducer,
    devTools: process.env.NODE_ENV === "development",
  })

  epicMiddleware.run(rootEpic)

  return store
}

const store = initStore()

export const makeStore = () => store

export type AppDispatch = ReturnType<typeof makeStore>["dispatch"]
export const wrapper = createWrapper(makeStore)
