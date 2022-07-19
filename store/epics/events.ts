import { AnyAction } from "@reduxjs/toolkit"
import { notify } from "config/toast-settings"
import { combineEpics, Epic } from "redux-observable"

import { filter, map, tap } from "rxjs"
import { State } from "store"
import {
  noWinners,
  numbersDrawn,
  playerEntered,
  requestedDraw,
  winners,
} from "store/features/events/actions"
import { fetchStats } from "store/features/lottery6/actions"
import { globalT } from "utils/globalT"

const playerEnteredEpic: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(
    filter(playerEntered.match),
    tap(({ payload }) =>
      notify(globalT("events:playerEntered", { player: payload.address }))
    ),
    map(() => fetchStats())
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

const noWinnersEpic: Epic<AnyAction, AnyAction, State> = (action$, state$) =>
  action$.pipe(
    filter(noWinners.match),
    tap(() =>
      notify(
        globalT("events:noWinners", {
          iteration: state$.value.lottery.numberOfDraws - 1,
        })
      )
    ),
    map(() => fetchStats())
  )

const winnersEpic: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(
    filter(winners.match),
    tap(({ payload }) =>
      notify(globalT("events:winners", { winners: payload }))
    ),
    map(() => fetchStats())
  )

const events = combineEpics(
  playerEnteredEpic,
  drawRequestedEpic,
  numbersDrawnEpic,
  noWinnersEpic,
  winnersEpic
)

export default events
