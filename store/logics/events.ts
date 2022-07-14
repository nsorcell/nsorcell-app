import { Lottery6__factory } from "@nsorcell/protocol"
import { LOTTERY_6 } from "config/contract-addresses"
import { createLogic } from "redux-logic"
import { initiateListeners } from "store/features/lottery6/actions"
import { actionFailed } from "store/features/web3/actions"
import { RootState } from "store/store"
import { LotteryEvents } from "types/web3"

const listenersLogic = createLogic({
  type: initiateListeners.type,
  validate({ getState }, allow, reject) {
    const { web3 } = getState() as RootState

    if (!web3.account || !web3.chainId || !web3.provider) {
      reject(
        actionFailed({
          reason: `Web3 properties are missing: ${JSON.stringify(web3)}`,
        })
      )
    }

    allow(initiateListeners())
  },
  async process({ getState }, dispatch, done) {
    const { web3 } = getState() as RootState

    const lottery = Lottery6__factory.connect(
      LOTTERY_6[web3.chainId],
      web3.provider!.getSigner()
    )

    lottery
      .on(LotteryEvents.ENTER, (event) => {
        console.log({ eventName: LotteryEvents.ENTER, event })
        // dispatch(playerEntered({ address: player }))
      })
      .on(LotteryEvents.REQUESTED_DRAW, () => {
        console.log({ eventName: LotteryEvents.REQUESTED_DRAW })

        // dispatch(requestedDraw())
      })
      .on(LotteryEvents.DRAW, (event) => {
        console.log({ eventName: LotteryEvents.DRAW, event })

        //   dispatch(
        //     numbersDrawn({
        //       winningNumbers,
        //     })
        //   )
      })
      .on(LotteryEvents.NO_WINNERS, () => {
        console.log({ eventName: LotteryEvents.NO_WINNERS })

        // dispatch(noWinners())
      })
      .on(LotteryEvents.WINNERS, (event) => {
        console.log({ eventName: LotteryEvents.WINNERS, event })

        // dispatch(_winners({ winners }))
      })

    done()
  },
})

export default [listenersLogic]
