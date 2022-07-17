import { combineEpics } from "redux-observable"

import bootstrap from "./bootstrap"
import events from "./events"
import lottery6 from "./lottery6"
import web3 from "./web3"

export default combineEpics(bootstrap, events, lottery6, web3)
