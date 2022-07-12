import { configureStore } from "@reduxjs/toolkit"
import { createLogicMiddleware } from "redux-logic"

import lottery6 from "./features/lottery6"
import web3 from "./features/web3"

import logics from "./logics"

// @ts-ignore
const logicMiddleware = createLogicMiddleware(logics, {})

export const store = configureStore({
  middleware: () => [logicMiddleware],
  reducer: {
    web3: web3.reducer,
    lottery6: lottery6.reducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
