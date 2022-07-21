import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit"
import { createEpicMiddleware } from "redux-observable"

import lottery6 from "./features/lottery6"
import web3 from "./features/web3/web3"

import rootEpic from "./epics"

const reducer = combineReducers({
  lottery: lottery6.reducer,
  web3: web3.reducer,
})

export type State = ReturnType<typeof reducer>

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, State>()

export const store = configureStore({
  middleware: [epicMiddleware],
  reducer,
})

epicMiddleware.run(rootEpic)

export type AppDispatch = typeof store.dispatch
