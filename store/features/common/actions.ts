import { createAction } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const BOOTSTRAP = "common/bootstrap"
export const bootstrap = createAction<undefined, typeof BOOTSTRAP>(BOOTSTRAP)

const FETCH_FAILED = "common/fetchFailed"
export const fetchFailed = createAction<{ error: any }, typeof FETCH_FAILED>(
  FETCH_FAILED
)

const REDUX_HYDRATE = HYDRATE
export const hydrate = createAction<any, typeof REDUX_HYDRATE>(REDUX_HYDRATE)
