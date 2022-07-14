import { useWeb3React } from "@web3-react/core"
import { ConnectorNames } from "components/provider-service"
import id from "ramda/src/identity"
import { useEffect, useState } from "react"
import ls from "utils/local-storage"
import { useAppSelector } from "./store"

const useIsConnected = () => {
  const [walletType, setWalletType] = useState<ConnectorNames>()
  const { account, isActive } = useWeb3React()
  const { web3 } = useAppSelector(id)

  useEffect(() => {
    const { walletType } = ls.get("user-wallet")

    setWalletType(walletType)
  }, [])

  const isConnected = Boolean(
    account && isActive && web3.account && web3.provider
  )

  return { account, isConnected, isActive, walletType }
}

export default useIsConnected
