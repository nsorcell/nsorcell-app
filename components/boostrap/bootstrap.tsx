import { Lottery6__factory } from "@nsorcell/protocol"
import { useAppDispatch, useAppSelector } from "hooks/store"
import useIsConnected from "hooks/useIsConnected"
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

  const { isConnected } = useIsConnected()
  const { provider, addresses } = useAppSelector((state) => state.web3)

  useEffect(() => {
    if (isConnected) {
      dispatch(bootstrap())

      const lotteryContract = Lottery6__factory.connect(
        addresses.lottery6,
        provider!.getSigner()
      )

      lotteryContract
        .on(LotteryEvents.ENTER, (address) =>
          dispatch(playerEntered({ address }))
        )
        .on(LotteryEvents.REQUESTED_DRAW, () => dispatch(requestedDraw()))
        .on(LotteryEvents.DRAW, (event) =>
          dispatch(numbersDrawn({ winningNumbers: event }))
        )
        .on(LotteryEvents.NO_WINNERS, () => dispatch(noWinners()))
        .on(LotteryEvents.WINNERS, (event) =>
          dispatch(winners({ winners: event }))
        )

      return () => {
        lotteryContract.removeAllListeners(LotteryEvents.ENTER)
        lotteryContract.removeAllListeners(LotteryEvents.REQUESTED_DRAW)
        lotteryContract.removeAllListeners(LotteryEvents.DRAW)
        lotteryContract.removeAllListeners(LotteryEvents.NO_WINNERS)
        lotteryContract.removeAllListeners(LotteryEvents.WINNERS)
      }
    }
  }, [isConnected])
  return null
}

export default Bootstrap
