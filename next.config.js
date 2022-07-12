/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config")

const nextConfig = {
  compiler: {
    emotion: true,
    styledComponents: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  env: {
    ALCHEMY_RPC_MAINNET: process.env.ALCHEMY_RPC_MAINNET,
    ALCHEMY_RPC_GOERLI: process.env.ALCHEMY_RPC_GOERLI,
    ALCHEMY_RPC_POLYGON_MAINNET: process.env.ALCHEMY_RPC_POLYGON_MAINNET,
    ALCHEMY_RPC_MUMBAI: process.env.ALCHEMY_RPC_MUMBAI,
  },
  swcMinify: false,
  ssr,
}

module.exports = nextConfig
