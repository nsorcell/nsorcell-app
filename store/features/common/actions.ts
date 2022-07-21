import { createAction } from "@reduxjs/toolkit"

const BOOTSTRAP = "common/bootstrap"
export const bootstrap = createAction<undefined, typeof BOOTSTRAP>(BOOTSTRAP)

const FETCH_FAILED = "common/fetchFailed"
export const fetchFailed = createAction<{ error: any }, typeof FETCH_FAILED>(
  FETCH_FAILED
)
