import { MetaMaskInpageProvider } from "@metamask/providers"
import { Registry__factory } from "@nsorcell/protocol"
import { REGISTRY } from "config/contract-addresses"
import { ethers } from "ethers"
import { AddressState, SupportedChainList } from "types/store"
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

export const getDefaultProvider = (defaultChainId: ChainId) => {
  return new ethers.providers.JsonRpcProvider(RPC_URLS[defaultChainId])
}

export const getDefaultChain = (state: AddressState): ChainId => {
  const [anyAddressState] = Object.values(state) as SupportedChainList[]
  const [firstChain] = Object.keys(anyAddressState)

  return parseInt(firstChain) as ChainId
}

export const getSupportedChains = async (): Promise<SupportedChainList> => {
  return Object.fromEntries(
    (
      await Promise.all(
        Object.entries(RPC_URLS).map(async ([chainIndex, rpc]) => {
          const chainId = parseInt(chainIndex) as Exclude<ChainId, 0>
          const provider = new ethers.providers.JsonRpcProvider(rpc)

          try {
            const registry = Registry__factory.connect(
              REGISTRY[chainId],
              provider
            )

            const address = await registry.getLottery6Address()
            return [chainId, address]
          } catch {
            return []
          }
        })
      )
    ).filter((entry) => entry.length)
  )
}
