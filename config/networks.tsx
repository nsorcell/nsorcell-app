import { ReactNode } from "react"
import { FaEthereum } from "react-icons/fa"
import { GrHostMaintenance } from "react-icons/gr"
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
    label: "Ethereum Mainnet",
    type: "mainnet",
  },
  4: {
    icon: <FaEthereum size={20} />,
    label: "Rinkeby Testnet",
    type: "testnet",
  },
  137: {
    icon: <img src="/images/polygon-matic.svg" width={20} />,
    label: "Polygon Mainnet",
    type: "mainnet",
  },
  80001: {
    icon: <img src="/images/polygon-matic.svg" width={20} />,
    label: "Mumbai Testnet",
    type: "testnet",
  },
  1337: {
    icon: <GrHostMaintenance size={20} tw="bg-blue-300" />,
    label: "Local1 (1337)",
    type: "local",
  },
  31337: {
    icon: <GrHostMaintenance size={20} tw="bg-blue-300" />,
    label: "Local2 (31337)",
    type: "local",
  },
}
