import { MetaMaskInpageProvider } from "@metamask/providers"
import { ethers } from "ethers"
import { ChainId } from "types/web3"
import { RPC_URLS } from "./chains"
// Local
export const localRPCEthereum = "http://localhost:8545"
export const localRPCMatic = "http://localhost:8540"

// Ethereum
export const RPCMainnet =
  process.env.ALCHEMY_RPC_MAINNET || "https://eth-mainnet.public.blastapi.io"
export const RPCRinkeby =
  process.env.ALCHEMY_RPC_RINKEBY ||
  "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161	"

// Polygon
export const RPCMatic =
  process.env.ALCHEMY_RPC_POLYGON_MAINNET || "https://polygon-rpc.com	"
export const RPCMumbai =
  process.env.ALCHEMY_RPC_MUMBAI ||
  "https://matic-testnet-archive-rpc.bwarelabs.com	"

export const injectedProvider = () => {
  if (typeof window !== "undefined") {
    return window.ethereum as MetaMaskInpageProvider
  }
}

export const initialChainId = () => {
  const ip = injectedProvider()

  // For now only rinkeby deployment, so set 4 as default to avoid ssr error
  return ip ? (parseInt(ip?.chainId!, 16) as ChainId) : 4
}

export const initialProvider = () => {
  const chainId = initialChainId()
  console.log(RPC_URLS[chainId])
  console.log(RPC_URLS)
  return new ethers.providers.JsonRpcProvider(RPC_URLS[chainId])
}
