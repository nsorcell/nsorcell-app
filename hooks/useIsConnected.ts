import { useWeb3React } from "@web3-react/core"
import id from "ramda/src/identity"
import { useAppSelector } from "./store"

const useIsConnected = () => {
  const { account, isActive } = useWeb3React()
  const { web3 } = useAppSelector(id)

  const isConnected = Boolean(
    account && isActive && web3.account && web3.provider
  )

  return { account, isConnected, isActive }
}

export default useIsConnected
