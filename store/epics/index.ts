import { combineEpics } from "redux-observable"

import web3Epic from "./web3"

export default combineEpics(web3Epic)
