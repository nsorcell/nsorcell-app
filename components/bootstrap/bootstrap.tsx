import { Lottery6__factory } from "@nsorcell/protocol"
import { useAppDispatch, useAppSelector } from "hooks/store"
import { FC, useEffect } from "react"
import { bootstrap } from "store/features/common/actions"
import { listenToLotteryEvents } from "utils/listeners/events"
import { listenToInPageProviderEvents } from "utils/listeners/inPageProvider"
import { getDefaultChain } from "utils/rpc"

const Bootstrap: FC = () => {
  const dispatch = useAppDispatch()

  const { web3, address } = useAppSelector((state) => state)

  useEffect(() => {
    dispatch(bootstrap())
  }, [])

  useEffect(() => {
    if (web3.chainId && web3.provider) {
      const defaultChainId = getDefaultChain(address)
      const lotteryContract = Lottery6__factory.connect(
        address.lottery6[web3.chainId]! ?? address.lottery6[defaultChainId],
        web3.provider ?? web3.defaultProvider
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
  }, [web3.chainId, web3.provider])
  return null
}

export default Bootstrap
