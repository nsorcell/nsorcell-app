import type { Web3Provider } from "@ethersproject/providers"
import { useWeb3React } from "@web3-react/core"
import { Connector } from "components/provider"
import { ConnectorNames, connectorsByName } from "components/provider-service"
import { useEffect, useRef } from "react"
import { connect, disconnect } from "store/features/web3/actions"
import { ChainId } from "types/web3"
import ls from "utils/local-storage"
import { useAppDispatch } from "./store"

const useConnectionManager = () => {
  const { account, isActive, chainId, provider } = useWeb3React<Web3Provider>()
  const connectorType = useRef<ConnectorNames>()

  console.log(provider)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const { account, walletType } = ls.get("user-wallet")

    if (account && walletType) {
      handleConnect(walletType)
    }
  }, [])

  const handleConnect = async (walletType: ConnectorNames) => {
    connectorType.current = walletType
    const connector: Connector = connectorsByName[walletType]

    if (walletType == ConnectorNames.WalletConnect && connector.deactivate) {
      connector.deactivate()
      ls.remove("user-wallet")
    }

    try {
      await connector.activate(chainId)

      saveConnector()
    } catch (e: any) {
      if (e.name === "NoMetaMaskError") {
        console.info("Waiting for MetaMask...")
      }
    }
  }

  const saveConnector = () => {
    if (!provider) return

    if (account && connectorType.current) {
      ls.set("user-wallet", { account, walletType: connectorType.current })

      dispatch(
        connect({
          account,
          provider,
          chainId: chainId as ChainId,
        })
      )
    }
  }

  useEffect(() => {
    saveConnector()
  }, [isActive])

  const handleDisconnect = () => {
    dispatch(disconnect())
  }

  return {
    handleConnect,
    handleDisconnect,
  }
}

export default useConnectionManager
