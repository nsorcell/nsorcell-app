import { Menu, MobileMenu } from "components/menu"
import { WalletModal } from "components/modal"
import WalletConnector from "components/wallet-connector"
import useConnectionManager from "hooks/useConnectionManager"
import useIsConnected from "hooks/useIsConnected"
import { FC, useState } from "react"
import "twin.macro"
import { HeaderContainer } from "./navigation.styled"

const Header: FC = () => {
  const { isActive, walletType } = useIsConnected()
  const { handleConnect, handleDisconnect } = useConnectionManager()
  const [modalIsOpen, setIsOpen] = useState(false)

  const onConnect = () => {
    if (isActive && walletType) {
      return handleConnect(walletType)
    }

    setIsOpen(true)
  }

  const connector = (
    <WalletConnector
      handleConnect={onConnect}
      handleDisconnect={handleDisconnect}
    />
  )

  return (
    <HeaderContainer>
      <img src="/images/nsorcell.svg" tw="w-14 h-14 md:w-20 md:h-20 md:ml-20" />
      <MobileMenu>{connector}</MobileMenu>
      <div tw="hidden items-center w-full px-16 md:visible md:flex">
        <div tw="w-full flex items-center justify-end gap-4">
          <Menu />
          {connector}
        </div>
      </div>
      <WalletModal isOpen={modalIsOpen} close={() => setIsOpen(false)} />
    </HeaderContainer>
  )
}
export default Header
