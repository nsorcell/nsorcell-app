import { Lottery6__factory } from "@nsorcell/protocol"
import { AnyAction } from "@reduxjs/toolkit"
import { LOTTERY_6 } from "config/contract-addresses"
import { notify } from "config/toast-settings"
import { parseEther } from "ethers/lib/utils"
import { combineEpics, Epic } from "redux-observable"

import { filter, take, tap } from "rxjs"
import { State } from "store"
import { enter } from "store/features/lottery6/actions"

const enterEpic: Epic<AnyAction, AnyAction, State> = (action$, state$) =>
  action$.pipe(
    filter(enter.match),
    take(1),
    tap(async (action) => {
      const { web3 } = state$.value

      const lotteryContract = Lottery6__factory.connect(
        LOTTERY_6[web3.chainId],
        web3.provider!.getSigner()
      )

      try {
        // dispatch(toggleWaitForApproval())

        await lotteryContract.enter(action.payload, {
          value: parseEther("0.1"),
        })
        notify("You have entered the lottery.")
      } catch (e) {
      } finally {
        // dispatch(toggleWaitForApproval())
      }
    })
  )

const lottery6Epic = combineEpics(enterEpic)

export default lottery6Epic
