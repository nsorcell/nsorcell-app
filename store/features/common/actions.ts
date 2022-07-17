import { createAction } from "@reduxjs/toolkit"

const BOOTSTRAP = "common/bootstrap"
export const bootstrap = createAction<undefined, typeof BOOTSTRAP>(BOOTSTRAP)
