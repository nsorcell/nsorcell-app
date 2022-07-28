import { Lottery6 } from "@nsorcell/protocol"
import { BigNumber } from "ethers"
import { AppDispatch } from "store"
import {
  numbersDrawn,
  playerEntered,
  requestedDraw,
  results,
} from "store/features/events/actions"
import { LotteryEvents } from "types/web3"

export const listenToLotteryEvents = (
  contract: Lottery6,
  dispatch: AppDispatch
) => {
  contract
    .on(LotteryEvents.ENTER, (address) => dispatch(playerEntered({ address })))
    .on(LotteryEvents.REQUESTED_DRAW, () => dispatch(requestedDraw()))
    .on(LotteryEvents.DRAW, (winningNumbers) => {
      dispatch(
        numbersDrawn({
          winningNumbers: winningNumbers
            .map((n: BigNumber) => n.toString())
            .join(", "),
        })
      )
    })
    .on(LotteryEvents.RESULTS, (event: string[][]) => dispatch(results(event)))

  return () => {
    contract.removeAllListeners(LotteryEvents.ENTER)
    contract.removeAllListeners(LotteryEvents.REQUESTED_DRAW)
    contract.removeAllListeners(LotteryEvents.DRAW)
    contract.removeAllListeners(LotteryEvents.RESULTS)
  }
}
