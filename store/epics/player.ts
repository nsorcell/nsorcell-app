import { providers } from "@0xsequence/multicall"
import { Lottery6__factory } from "@nsorcell/protocol"
import { AnyAction } from "@reduxjs/toolkit"
import { LuckyNumbers } from "components/lottery/types"
import { combineEpics, Epic } from "redux-observable"
import { catchError, filter, from, map, of, switchMap } from "rxjs"
import { State } from "store"
import { fetchFailed } from "store/features/common/actions"
import {
  fetchPlayerData,
  playerDataReceived,
} from "store/features/player/actions"

const fetchPlayerDataEpic: Epic<AnyAction, AnyAction, State> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(fetchPlayerData.match),
    switchMap(() => {
      const { web3, address } = state$.value

      const lotteryContract = Lottery6__factory.connect(
        address.lottery6[web3.chainId]!,
        new providers.MulticallProvider(web3.provider ?? web3.defaultProvider!)
      )

      return from(lotteryContract.getPlayerNumbers(web3.account)).pipe(
        map((numbers) =>
          playerDataReceived({
            numbers: numbers.map((n) => n.toNumber()) as LuckyNumbers,
          })
        ),
        catchError((err) => of(fetchFailed(err)))
      )
    })
  )

export default combineEpics(fetchPlayerDataEpic)
