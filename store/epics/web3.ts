import { AnyAction } from "@reduxjs/toolkit"
import { ethers } from "ethers"
import { combineEpics, Epic } from "redux-observable"

import { catchError, filter, from, map, of, switchMap, tap } from "rxjs"
import { State } from "store"
import {
  disconnect,
  externalDisconnect,
  initiateSwitchChain,
  switchChain,
} from "store/features/web3/actions"
import ls from "utils/local-storage"
import { injectedProvider } from "utils/rpc"

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

const disconnectEpic: Epic<AnyAction, AnyAction, State> = (action$) =>
  action$.pipe(
    filter(externalDisconnect.match),
    tap(() => ls.remove("user-wallet")),
    map(() => disconnect())
  )

const web3Epic = combineEpics(switchChainEpic, disconnectEpic)

export default web3Epic
