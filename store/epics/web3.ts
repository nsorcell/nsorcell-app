import { AnyAction } from "@reduxjs/toolkit"
import { ethers } from "ethers"
import { combineEpics, Epic } from "redux-observable"

import { catchError, filter, from, map, of, switchMap, take, tap } from "rxjs"
import { State } from "store"
import {
  connect,
  initiateSwitchChain,
  switchChain,
} from "store/features/web3/actions"
import { injectedProvider } from "utils/rpc"

const connectEpic: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(
    filter(connect.match),
    take(1),
    tap((action) => console.log(action))
  )
const switchChainEpic: Epic<AnyAction, AnyAction, State> = (action$, state$) =>
  action$.pipe(
    filter(initiateSwitchChain.match),
    switchMap((action) => {
      const { web3 } = state$.value
      return from(
        injectedProvider()?.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ethers.utils.hexValue(action.payload) }],
        }) ?? []
      ).pipe(
        map(() => switchChain(action.payload)),
        catchError(() => of(switchChain(web3.chainId)))
      )
    })
  )

const web3Epic = combineEpics(connectEpic, switchChainEpic)

export default web3Epic
