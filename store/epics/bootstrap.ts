import { AnyAction } from "@reduxjs/toolkit"
import { combineEpics, Epic } from "redux-observable"
import { filter, from, mergeMap, take } from "rxjs"
import { State } from "store"
import { bootstrap } from "store/features/common/actions"
import { fetchStats, initiateListeners } from "store/features/lottery6/actions"

const bootstrapEpic: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(
    filter(bootstrap.match),
    take(1),
    mergeMap(() => from([fetchStats(), initiateListeners()]))
  )

export default combineEpics(bootstrapEpic)
