import type { AddEthereumChainParameter } from "@web3-react/types"
import {
  localRPCEthereum,
  localRPCMatic,
  RPCMainnet,
  RPCMatic,
  RPCMumbai,
  RPCRinkeby,
} from "./rpc"

export const chainIds = {
  mainnet: 1,
  rinkeby: 4,
  local: 1337,
  matic: 137,
  mumbai: 80001,
}

export const RPC_URLS: { [chainId: number]: string } = {
  [chainIds.mainnet]: RPCMainnet,
  [chainIds.local]: localRPCEthereum,
  [chainIds.rinkeby]: RPCRinkeby,
  [chainIds.matic]: RPCMatic,
  [chainIds.local]: localRPCMatic,
  [chainIds.mumbai]: RPCMumbai,
}

export const RPC_NAMES: { [chainId: number]: string } = {
  [chainIds.mainnet]: "Ethereum Mainnet",
  [chainIds.local]: "Ethereum Local",
  [chainIds.rinkeby]: "Ethereum Goerli",
  [chainIds.matic]: "Polygon Mainnet",
  [chainIds.local]: "Polygon Local",
  [chainIds.mumbai]: "Polygon Mumbai",
}

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
}

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
}

interface BasicChainInformation {
  urls: string[]
  name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"]
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"]
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId]
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    }
  } else {
    return chainId
  }
}

export const CHAINS: {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation
} = {
  [chainIds.mainnet]: {
    urls: [RPC_URLS[chainIds.mainnet]],
    nativeCurrency: ETH,
    name: RPC_NAMES[chainIds.mainnet],
  },
  [chainIds.rinkeby]: {
    urls: [RPC_URLS[chainIds.rinkeby]],
    nativeCurrency: ETH,
    name: RPC_NAMES[chainIds.rinkeby],
  },
  [chainIds.local]: {
    urls: [RPC_URLS[chainIds.local]],
    nativeCurrency: ETH,
    name: RPC_NAMES[chainIds.local],
  },
  [chainIds.matic]: {
    urls: [RPC_URLS[chainIds.matic]],
    name: RPC_NAMES[chainIds.matic],
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  [chainIds.mumbai]: {
    urls: [RPC_URLS[chainIds.mumbai]],
    name: RPC_NAMES[chainIds.mumbai],
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://mumbai.polygonscan.com/ "],
  },
  [chainIds.local]: {
    urls: [RPC_URLS[chainIds.local]],
    nativeCurrency: MATIC,
    name: RPC_NAMES[chainIds.local],
  },
}

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs
  }

  return accumulator
}, {})
