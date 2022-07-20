import is from "ramda/src/is"
import { AppDispatch } from "store"
import { externalDisconnect, switchChain } from "store/features/web3/actions"
import { ChainId } from "types/web3"
import { injectedProvider } from "utils/rpc"

export const listenToInPageProviderEvents = (dispatch: AppDispatch) => {
  const injected = injectedProvider()

  injected?.on("accountsChanged", (accounts) => {
    if (is(Array, accounts)) {
      return accounts.length ? "" : dispatch(externalDisconnect())
    }
  })

  injected?.on("chainChanged", (chainId) => {
    if (is(String, chainId)) {
      const numericChainId = parseInt(chainId, 16) as ChainId
      dispatch(switchChain(numericChainId))
    }
  })
  return () => {
    injected?.removeAllListeners("accountsChanged")
    injected?.removeAllListeners("chainChanged")
  }
}
