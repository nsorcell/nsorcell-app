import { createLogic } from "redux-logic"
import { connect, disconnect } from "store/features/web3/actions"
import { Web3State } from "types/store"

const connectLogic = createLogic<{}, Web3State>({
  type: connect.type,
  process({ getState, action, cancelled$ }, dispatch, done) {
    done()
  },
})

const disconnectLogic = createLogic({
  type: disconnect.type,
  process({ getState, action, cancelled$ }, dispatch, done) {
    done()
  },
})

export default [connectLogic, disconnectLogic]
