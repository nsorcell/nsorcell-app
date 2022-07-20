import { AnyAction } from "@reduxjs/toolkit"
import { combineEpics, Epic } from "redux-observable"
import { concatMap, filter, from, map } from "rxjs"
import { State } from "store"
import { bootstrap } from "store/features/common/actions"
import { fetchStats, initiateListeners } from "store/features/lottery6/actions"
import { addressesReceived, fetchAddresses } from "store/features/web3/actions"

const bootstrapSequenceEpic1: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(
    filter(bootstrap.match),
    map(() => fetchAddresses())
  )

const bootstrapSequenceEpic2: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(
    filter(addressesReceived.match),
    concatMap(() => from([fetchStats(), initiateListeners()]))
  )
export default combineEpics(bootstrapSequenceEpic1, bootstrapSequenceEpic2)
