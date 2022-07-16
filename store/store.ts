import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit"
import { createEpicMiddleware } from "redux-observable"

import events from "./features/events"
import lottery6 from "./features/lottery6"
import web3 from "./features/web3/web3"

const reducer = combineReducers({
  events: events.reducer,
  lottery: lottery6.reducer,
  web3: web3.reducer,
})

export type State = ReturnType<typeof reducer>

import rootEpic from "./epics"

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, State>()

export const store = configureStore({
  middleware: (defaultMiddleware) =>
    defaultMiddleware({ thunk: false }).concat(epicMiddleware),
  reducer,
  devTools: true,
})

epicMiddleware.run(rootEpic)

export type AppDispatch = typeof store.dispatch
