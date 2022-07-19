import { providers } from "@0xsequence/multicall"
import { Lottery6__factory } from "@nsorcell/protocol"
import { AnyAction, isAnyOf } from "@reduxjs/toolkit"
import { notify } from "config/toast-settings"
import { parseEther } from "ethers/lib/utils"
import { combineEpics, Epic } from "redux-observable"
import { catchError, filter, from, map, of, pipe, switchMap, tap } from "rxjs"
import { State } from "store"
import {
  enter,
  enterFailed,
  enterSuccessful,
  fetchStats,
  fetchStatsReceived,
} from "store/features/lottery6/actions"
import { toggleWaitForApproval } from "store/features/web3/actions"
import { transformFetchStateResult } from "utils/store"

const fetchStateEpic: Epic<AnyAction, AnyAction, State> = (action$, state$) =>
  action$.pipe(
    filter(fetchStats.match),
    switchMap(() => {
      const { web3 } = state$.value

      const lotteryContract = Lottery6__factory.connect(
        web3.addresses.lottery6,
        new providers.MulticallProvider(web3.provider)
      )

      return from(
        Promise.all([
          lotteryContract.getState(),
          lotteryContract.getPlayers(),
          lotteryContract.getHistory(),
          lotteryContract.getDrawInterval(),
          lotteryContract.getNumberOfDraws(),
          lotteryContract.getLastDrawTimestamp(),
          web3.provider!.getBalance(lotteryContract.address),
        ])
      )
    }),
    map(pipe(transformFetchStateResult, fetchStatsReceived))
  )

const enterEpic: Epic<AnyAction, AnyAction, State> = (action$, state$) =>
  action$.pipe(
    filter(enter.match),
    switchMap((action) => {
      const { web3 } = state$.value

      const lotteryContract = Lottery6__factory.connect(
        web3.addresses.lottery6,
        web3.provider!.getSigner()
      )

      return from(
        lotteryContract.enter(action.payload, {
          value: parseEther("0.1"),
        })
      ).pipe(
        map(() => enterSuccessful()),
        tap(() => {
          notify("Player entered the lottery.")
        }),
        catchError(() => of(enterFailed()))
      )
    })
  )

const waitForApprovalEpic: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(
    filter(isAnyOf(enter.match, enterSuccessful.match, enterFailed.match)),
    map(() => toggleWaitForApproval())
  )

const lottery6Epic = combineEpics(
  enterEpic,
  fetchStateEpic,
  waitForApprovalEpic
)

export default lottery6Epic
