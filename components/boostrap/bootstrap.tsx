import { Lottery6__factory } from "@nsorcell/protocol"
import { BigNumber } from "ethers"
import { useAppDispatch, useAppSelector } from "hooks/store"
import { FC, useEffect } from "react"
import { bootstrap } from "store/features/common/actions"
import {
  noWinners,
  numbersDrawn,
  playerEntered,
  requestedDraw,
  winners,
} from "store/features/events/actions"
import { LotteryEvents } from "types/web3"

const Bootstrap: FC = () => {
  const dispatch = useAppDispatch()

  const { provider, addresses } = useAppSelector((state) => state.web3)

  useEffect(() => {
    dispatch(bootstrap())

    const lotteryContract = Lottery6__factory.connect(
      addresses.lottery6,
      provider
    )

    lotteryContract
      .on(LotteryEvents.ENTER, (address) =>
        dispatch(playerEntered({ address }))
      )
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
      .on(LotteryEvents.NO_WINNERS, () => dispatch(noWinners()))
      .on(LotteryEvents.WINNERS, () => {
        dispatch(winners({ winners: [] }))
      })

    return () => {
      lotteryContract.removeAllListeners(LotteryEvents.ENTER)
      lotteryContract.removeAllListeners(LotteryEvents.REQUESTED_DRAW)
      lotteryContract.removeAllListeners(LotteryEvents.DRAW)
      lotteryContract.removeAllListeners(LotteryEvents.NO_WINNERS)
      lotteryContract.removeAllListeners(LotteryEvents.WINNERS)
    }
  }, [])
  return null
}

export default Bootstrap
