import { Lottery6__factory } from "@nsorcell/protocol"
import { LOTTERY_6 } from "config/contract-addresses"
import { notify } from "config/toast-settings"
import { createLogic } from "redux-logic"
import { fetchStats, initiateListeners } from "store/features/lottery6/actions"
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
    const { web3, lottery6 } = getState() as RootState

    const lottery = Lottery6__factory.connect(
      LOTTERY_6[web3.chainId],
      web3.provider!.getSigner()
    )

    lottery
      .on(LotteryEvents.ENTER, (event) => {
        console.log({ eventName: LotteryEvents.ENTER, event })
        // dispatch(playerEntered({ address: player }))

        if (lottery6.state === "STANDBY") {
          notify(`First player ${event} entered. Starting lottery countdown.`)
        } else {
          notify(`Player ${event} entered.`)
        }

        dispatch(fetchStats())
      })
      .on(LotteryEvents.REQUESTED_DRAW, () => {
        notify("Draws requested.")

        // dispatch(requestedDraw())
      })
      .on(LotteryEvents.DRAW, (event) => {
        notify(`Numbers drawn: ${[1, 2, 3, 4, 5]}`)

        //   dispatch(
        //     numbersDrawn({
        //       winningNumbers,
        //     })
        //   )
      })
      .on(LotteryEvents.NO_WINNERS, () => {
        notify("There are no winners in this draw, restarting Lottery.")

        // dispatch(noWinners())
      })
      .on(LotteryEvents.WINNERS, (event) => {
        notify(`Lottery finished, winners are ${["address1", "address2"]}`)

        // dispatch(_winners({ winners }))
      })

    done()
  },
})

export default [listenersLogic]
