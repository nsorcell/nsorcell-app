import { AnyAction } from "@reduxjs/toolkit"
import { notify } from "config/toast-settings"
import { combineEpics, Epic } from "redux-observable"

import { filter, from, map, mergeMap, tap } from "rxjs"
import { State } from "store"
import {
  numbersDrawn,
  playerEntered,
  requestedDraw,
  results,
} from "store/features/events/actions"
import { fetchStats } from "store/features/lottery6/actions"
import { fetchPlayerData } from "store/features/player/actions"
import { globalT } from "utils/globalT"

const playerEnteredEpic: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(
    filter(playerEntered.match),
    tap(({ payload }) =>
      notify(globalT("events:playerEntered", { player: payload.address }))
    ),
    mergeMap(() => from([fetchStats(), fetchPlayerData()]))
  )

const drawRequestedEpic: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(
    filter(requestedDraw.match),
    tap(() => notify(globalT("events:drawRequested"))),
    map(() => fetchStats())
  )

const numbersDrawnEpic: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(
    filter(numbersDrawn.match),
    tap(({ payload }) =>
      notify(
        globalT("events:numbersDrawn", {
          numbers: payload.winningNumbers,
        })
      )
    ),
    map(() => fetchStats())
  )

const resultsEpic: Epic<AnyAction, AnyAction, State> = (action$, state$) =>
  action$.pipe(
    filter(results.match),
    tap(
      ({ payload }) =>
        payload &&
        notify(
          globalT("events:results", {
            hits: payload.indexOf(
              payload.find((hitMap) =>
                hitMap.includes(state$.value.web3.account)
              )!
            ),
            iteration: state$.value.lottery.numberOfDraws - 1,
          })
        )
    ),
    mergeMap(() => from([fetchStats(), fetchPlayerData()]))
  )

const events = combineEpics(
  playerEnteredEpic,
  drawRequestedEpic,
  numbersDrawnEpic,
  resultsEpic
)

export default events
