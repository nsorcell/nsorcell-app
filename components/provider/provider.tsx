import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core"
import { MetaMask } from "@web3-react/metamask"
import { Network } from "@web3-react/network"
import { WalletConnect } from "@web3-react/walletconnect"
import { FC, ReactNode } from "react"

import { hooks as metaMaskHooks, metaMask } from "utils/connectors/metamask"
import { hooks as networkHooks, network } from "utils/connectors/network"
import {
  hooks as walletConnectHooks,
  walletConnect,
} from "utils/connectors/walletconnect"

export type Connector = MetaMask | WalletConnect | Network

const connectors: [Connector, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [network, networkHooks],
]

const Provider: FC<{ children: ReactNode }> = ({ children }) => (
  <Web3ReactProvider lookupENS connectors={connectors}>
    {children}
  </Web3ReactProvider>
)

export default Provider
