// Local
export const localRPCEthereum = "http://localhost:8545"
export const localRPCMatic = "http://localhost:8540"

// Ethereum
export const RPCMainnet =
  process.env.ALCHEMY_RPC_MAINNET || "https://eth-mainnet.public.blastapi.io"
export const RPCGoerli =
  process.env.ALCHEMY_RPC_GOERLI || "https://rpc.goerli.mudit.blog	"

// Polygon
export const RPCMatic =
  process.env.ALCHEMY_RPC_POLYGON_MAINNET || "https://polygon-rpc.com	"
export const RPCMumbai =
  process.env.ALCHEMY_RPC_MUMBAI ||
  "https://matic-testnet-archive-rpc.bwarelabs.com	"
