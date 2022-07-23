import { combineEpics } from "redux-observable"

import bootstrap from "./bootstrap"
import common from "./common"
import events from "./events"
import lottery6 from "./lottery6"
import player from "./player"
import web3 from "./web3"

export default combineEpics(bootstrap, common, events, lottery6, player, web3)
