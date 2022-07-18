import { AnyAction } from "@reduxjs/toolkit"
import { combineEpics, Epic } from "redux-observable"
import { ignoreElements, tap } from "rxjs"
import { State } from "store"

const noopEpic: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(ignoreElements())

const debugEpic: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(tap(console.log), ignoreElements())

export default combineEpics(
  process.env.NODE_ENV === "development" ? debugEpic : noopEpic
)
