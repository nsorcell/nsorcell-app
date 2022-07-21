import { AnyAction } from "@reduxjs/toolkit"
import { combineEpics, Epic } from "redux-observable"
import { concatMap, filter, from, map } from "rxjs"
import { State } from "store"
import { bootstrap } from "store/features/common/actions"
import { fetchStats, initiateListeners } from "store/features/lottery6/actions"
import { connectDefault } from "store/features/web3/actions"
import { getDefaultChain, getDefaultProvider } from "utils/rpc"

const setDefaultDependencies: Epic<AnyAction, AnyAction, State> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(bootstrap.match),
    map(() => {
      const { address } = state$.value

      const chainId = getDefaultChain(address)
      const provider = getDefaultProvider(chainId)

      return connectDefault({
        chainId,
        provider,
      })
    })
  )

const bootstrapEpic: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(
    filter(connectDefault.match),
    concatMap(() => from([fetchStats(), initiateListeners()]))
  )
export default combineEpics(setDefaultDependencies, bootstrapEpic)
