import is from "ramda/src/is"
import { AppDispatch } from "store"
import { externalDisconnect } from "store/features/web3/actions"
import { injectedProvider } from "utils/rpc"

export const listenToInPageProviderEvents = (dispatch: AppDispatch) => {
  const injected = injectedProvider()

  injected?.on("accountsChanged", (accounts) => {
    if (is(Array, accounts)) {
      return accounts.length ? "" : dispatch(externalDisconnect())
    }
  })

  return () => {
    injected?.removeAllListeners("accountsChanged")
  }
}
