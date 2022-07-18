import { AnyAction } from "@reduxjs/toolkit"
import { combineEpics, Epic } from "redux-observable"
import { ignoreElements, tap } from "rxjs"
import { State } from "store"

const debugEpic: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(tap(console.log), ignoreElements())

export default combineEpics(debugEpic)
