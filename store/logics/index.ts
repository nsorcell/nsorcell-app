import eventsLogic from "./events"
import lottery6Logic from "./lottery6"
import web3Logic from "./web3"

export default [...web3Logic, ...lottery6Logic, ...eventsLogic]
