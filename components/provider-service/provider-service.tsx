import { FC, useCallback } from "react"
import tw from "twin.macro"
import Metamask from "utils/connectors/metamask"
import Network from "utils/connectors/network"
import WalletConnect from "utils/connectors/walletconnect"

const ProviderContainer = tw.div`cursor-pointer hover:bg-gray-300 p-4`

type ProviderItemProps = {
  name: string
  connectorName: ConnectorNames
  icon: {
    dark: string
    light: string
    width?: number
    height?: number
  }
  handleConnect: (connectorName: ConnectorNames) => void
}

const ProviderItem: FC<ProviderItemProps> = ({
  name,
  connectorName,
  icon,
  handleConnect,
}) => {
  const handleClick = useCallback(() => {
    handleConnect(connectorName)
  }, [handleConnect])

  return (
    <ProviderContainer onClick={handleClick}>
      <img
        src={icon.light}
        alt={name}
        height={icon.height}
        width={icon.width}
      />
    </ProviderContainer>
  )
}

export default ProviderItem

export enum ConnectorNames {
  Metamask = "Metamask",
  Network = "Network",
  WalletConnect = "WalletConnect",
}

export const connectorsByName = {
  [ConnectorNames.Metamask]: Metamask,
  [ConnectorNames.WalletConnect]: WalletConnect,
  [ConnectorNames.Network]: Network,
}

export const providerItems: Omit<ProviderItemProps, "handleConnect">[] = [
  {
    name: "Metamask",
    connectorName: ConnectorNames.Metamask,
    icon: {
      dark: "/images/logo-dark-metamask.svg",
      light: "/images/logo-metamask.svg",
      width: 300,
      height: 40,
    },
  },
  {
    name: "WalletConnect",
    connectorName: ConnectorNames.WalletConnect,
    icon: {
      dark: "/images/logo-dark-walletconnect.svg",
      light: "/images/logo-walletconnect.svg",
      width: 300,
      height: 40,
    },
  },
]
