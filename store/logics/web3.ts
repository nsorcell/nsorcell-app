// import { createLogic, StandardAction } from "redux-logic"
// import { connect, disconnect } from "store/features/web3/actions"
// import { Web3State } from "types/store"

// const connectLogic = createLogic<
//   Web3State,
//   StandardAction<typeof connect.type>
// >({
//   type: connect.type,
//   process({ getState, action, cancelled$ }, dispatch, done) {
//     done()
//   },
// })

// const disconnectLogic = createLogic<
//   Web3State,
//   StandardAction<typeof disconnect.type>
// >({
//   type: disconnect.type,
//   process({ getState, action, cancelled$ }, dispatch, done) {
//     done()
//   },
// })

// export default [connectLogic, disconnectLogic]
export {}
