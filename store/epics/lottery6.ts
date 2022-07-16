import { providers } from "@0xsequence/multicall"
import { Lottery6__factory } from "@nsorcell/protocol"
import { AnyAction } from "@reduxjs/toolkit"
import { LOTTERY_6 } from "config/contract-addresses"
import { notify } from "config/toast-settings"
import { parseEther } from "ethers/lib/utils"
import { combineEpics, Epic } from "redux-observable"
import { filter, from, ignoreElements, map, mergeMap, tap } from "rxjs"
import { State } from "store"
import {
  enter,
  fetchStats,
  fetchStatsReceived,
} from "store/features/lottery6/actions"
import { toggleWaitForApproval } from "store/features/web3/actions"
import { History, LotteryState } from "types/store"

const fetchStateEpic: Epic<AnyAction, AnyAction, State> = (action$, state$) =>
  action$.pipe(
    filter(fetchStats.match),
    mergeMap(() => {
      const { web3 } = state$.value
      const lotteryContract = Lottery6__factory.connect(
        LOTTERY_6[web3.chainId],
        new providers.MulticallProvider(web3.provider!)
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
    map(
      ([
        resState,
        resPlayers,
        resHistory,
        resDrawInterval,
        resNumberOfDraws,
        resLastDraw,
        resPrizePool,
      ]) => {
        const history = resHistory.reduce<History>(
          (acc, [winningNumbers, winners], i) => {
            return {
              ...acc,
              [i]: {
                winningNumbers: winningNumbers.map((n) => n.toNumber()),
                winners,
              },
            }
          },
          {} as History
        )

        const states: LotteryState[] = [
          "STANDBY",
          "OPEN",
          "DRAWING",
          "CALCULATING",
        ]
        const state_: LotteryState = states[resState.toNumber()]
        const drawInterval = resDrawInterval.toNumber()
        const lastDraw = resLastDraw.toNumber()
        const numberOfDraws = resNumberOfDraws.toNumber()
        const prizePool = resPrizePool.toString()

        return {
          state: state_,
          players: resPlayers,
          history,
          drawInterval,
          lastDraw,
          numberOfDraws,
          prizePool,
        }
      }
    ),
    map(fetchStatsReceived)
  )

const enterEpic: Epic<AnyAction, AnyAction, State> = (action$, state$) =>
  action$.pipe(
    filter(enter.match),
    tap(async (action) => {
      const { web3 } = state$.value

      const lotteryContract = Lottery6__factory.connect(
        LOTTERY_6[web3.chainId],
        web3.provider!.getSigner()
      )

      await lotteryContract.enter(action.payload, {
        value: parseEther("0.1"),
      })
      notify("You have entered the lottery.")

      return toggleWaitForApproval()
    }),
    ignoreElements()
  )

const lottery6Epic = combineEpics(enterEpic, fetchStateEpic)

export default lottery6Epic
