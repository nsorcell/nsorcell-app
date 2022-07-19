import { Registry__factory } from "@nsorcell/protocol"
import { AnyAction } from "@reduxjs/toolkit"
import { REGISTRY } from "config/contract-addresses"
import { ethers } from "ethers"
import { combineEpics, Epic } from "redux-observable"

import { catchError, filter, from, map, of, switchMap } from "rxjs"
import { State } from "store"
import {
  addressesReceived,
  fetchAddresses,
  initiateSwitchChain,
  switchChain,
} from "store/features/web3/actions"
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

const fetchAddressesEpic: Epic<AnyAction, AnyAction, State> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(fetchAddresses.match),
    switchMap(() => {
      const { web3 } = state$.value

      const registryContract = Registry__factory.connect(
        REGISTRY[web3.chainId],
        web3.provider!
      )

      return from(Promise.all([registryContract.getLottery6Address()]))
    }),
    map(([lottery6]) => addressesReceived({ lottery6 }))
  )

const web3Epic = combineEpics(switchChainEpic, fetchAddressesEpic)

export default web3Epic
