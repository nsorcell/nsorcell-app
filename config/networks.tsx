import { ReactNode } from "react"
import { FaEthereum } from "react-icons/fa"
import { GiCogLock } from "react-icons/gi"
import "twin.macro"
import { ChainId } from "types/web3"

export type NetworkAttribute = {
  icon: ReactNode
  label: string
  type: "mainnet" | "testnet" | "local"
}

export const networkSelectionConfig: Record<ChainId, NetworkAttribute> = {
  1: {
    icon: <FaEthereum size={20} />,
    label: "networks.mainnet",
    type: "mainnet",
  },
  4: {
    icon: <FaEthereum size={20} />,
    label: "networks.rinkeby",
    type: "testnet",
  },
  137: {
    icon: <img src="/images/polygon-matic.svg" width={20} />,
    label: "networks.matic",
    type: "mainnet",
  },
  80001: {
    icon: <img src="/images/polygon-matic.svg" width={20} />,
    label: "networks.mumbai",
    type: "testnet",
  },
  1337: {
    icon: <GiCogLock size={20} tw="text-green-400" />,
    label: "networks.local1",
    type: "local",
  },
  31337: {
    icon: <GiCogLock size={20} tw="text-green-400" />,
    label: "networks.local2",
    type: "local",
  },
}
