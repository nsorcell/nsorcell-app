import { combineEpics } from "redux-observable"

import events from "./events"
import lottery6 from "./lottery6"
import web3 from "./web3"

export default combineEpics(events, lottery6, web3)
