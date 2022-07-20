import { Lottery6__factory } from "@nsorcell/protocol"
import { useAppDispatch, useAppSelector } from "hooks/store"
import id from "ramda/src/identity"
import { FC, useEffect } from "react"
import { bootstrap } from "store/features/common/actions"
import { listenToLotteryEvents } from "utils/listeners/events"
import { listenToInPageProviderEvents } from "utils/listeners/inPageProvider"

const Bootstrap: FC = () => {
  const dispatch = useAppDispatch()

  const { provider, addresses, chainId } = useAppSelector((state) => state.web3)

  useEffect(() => {
    dispatch(bootstrap())
  }, [chainId])

  useEffect(() => {
    if (Object.values(addresses).every(id)) {
      const lotteryContract = Lottery6__factory.connect(
        addresses.lottery6,
        provider
      )

      const removeLotteryListeners = listenToLotteryEvents(
        lotteryContract,
        dispatch
      )

      const removeInpageProviderListeners =
        listenToInPageProviderEvents(dispatch)

      return () => {
        removeLotteryListeners()
        removeInpageProviderListeners()
      }
    }
  }, [chainId, addresses])
  return null
}

export default Bootstrap
