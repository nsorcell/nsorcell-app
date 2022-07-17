import { Lottery6__factory } from "@nsorcell/protocol"
import { AnyAction } from "@reduxjs/toolkit"
import { LOTTERY_6 } from "config/contract-addresses"
import { notify } from "config/toast-settings"
import { combineEpics, Epic } from "redux-observable"

import { filter, take, tap } from "rxjs"
import { State } from "store"
import { initiateListeners } from "store/features/lottery6/actions"
import { LotteryEvents } from "types/web3"
import { blockScan } from "utils/address"

const initiateListenersEpic: Epic<AnyAction, AnyAction, State> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(initiateListeners.match),
    take(1),
    tap(() => {
      const { web3, lottery } = state$.value

      const lotteryContract = Lottery6__factory.connect(
        LOTTERY_6[web3.chainId],
        web3.provider!.getSigner()
      )

      lotteryContract
        .on(LotteryEvents.ENTER, (event) => {
          console.log({ eventName: LotteryEvents.ENTER, event })
          // dispatch(playerEntered({ address: player }))

          if (lottery.state === "STANDBY") {
            notify(`First player # entered. Starting lottery countdown.`, {
              injectUrl: blockScan(event),
            })
          } else {
            notify(`Player # entered.`, { injectUrl: blockScan(event) })
          }
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
    })
  )

const events = combineEpics(initiateListenersEpic)

export default events
