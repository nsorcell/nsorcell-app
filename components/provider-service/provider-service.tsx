import { Text } from "components/typography"
import { FC, useCallback } from "react"
import tw, { styled } from "twin.macro"
import Metamask from "utils/connectors/metamask"
import Network from "utils/connectors/network"
import WalletConnect from "utils/connectors/walletconnect"

const ProviderContainer = styled.div(() => [
  tw`flex flex-col items-center p-4 min-w-[140px]`,
  tw`cursor-pointer rounded-md`,
  tw`transition-all duration-200`,
  tw`hover:bg-gray-600`,
])

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
      <img src={icon.dark} alt={name} height={icon.height} width={icon.width} />
      <Text variant="subtitle1" tw="mt-2">
        {name}
      </Text>
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
      dark: "/images/metamask-logo.png",
      light: "/images/metamask-logo.png",
      width: 80,
      height: 80,
    },
  },
  {
    name: "WalletConnect",
    connectorName: ConnectorNames.WalletConnect,
    icon: {
      dark: "/images/walletconnect-logo.png",
      light: "/images/walletconnect-logo.png",
      width: 80,
      height: 80,
    },
  },
]
