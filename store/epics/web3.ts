import { AnyAction } from "@reduxjs/toolkit"
import { combineEpics, Epic } from "redux-observable"

import { filter, take, tap } from "rxjs"
import { State } from "store"
import { connect } from "store/features/web3/actions"

const connectEpic: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(
    filter(connect.match),
    take(1),
    tap((action) => console.log(action))
  )

const web3Epic = combineEpics(connectEpic)

export default web3Epic
