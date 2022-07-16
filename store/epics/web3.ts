import { AnyAction } from "@reduxjs/toolkit"
import { combineEpics, Epic, ofType } from "redux-observable"

import { tap } from "rxjs"
import { State } from "store"
import web3 from "store/features/web3"
import { connect } from "store/features/web3/actions"

web3.actions

const connectEpic: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(
    ofType(connect.type),
    tap((action) => console.log(action))
  )

const web3Epic = combineEpics(connectEpic)

export default web3Epic
