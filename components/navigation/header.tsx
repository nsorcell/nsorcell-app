import Button from "components/button"
import { WalletModal } from "components/modal"
import NetworkDropdown from "components/network-dropdown"
import { Text } from "components/typography"
import useConnectionManager from "hooks/useConnectionManager"
import useIsConnected from "hooks/useIsConnected"
import useScrollable from "hooks/useScrollable"
import { useTranslation } from "next-i18next"
import Link from "next/link"
import { FC, ReactNode, useEffect, useState } from "react"
import { FaDev, FaHome, FaInfoCircle, FaLink, FaUserAlt } from "react-icons/fa"
import { TbNumbers } from "react-icons/tb"
import tw, { styled } from "twin.macro"
import { shortenAddress } from "utils/address"
import HamburgerMenu from "./hamburger-menu"

const HeaderContainer = tw.header`w-full flex justify-between items-center py-4 px-4 md:py-8`

const MenuListItem: FC<{ label: string; href?: string; icon?: ReactNode }> = ({
  label,
  href = "#",
  icon,
}) => {
  return (
    <li tw="flex justify-center items-center my-6 md:my-0 md:mr-20 cursor-pointer">
      <Link href={href}>
        <a tw="flex">
          <span tw="flex items-center mr-2">{icon}</span>
          <Text variant="body1" tw="text-xl md:text-base">
            {label}
          </Text>
        </a>
      </Link>
    </li>
  )
}

const MobileMenuDropdown = styled.div<{ isOpen: boolean }>(({ isOpen }) => [
  tw`fixed w-full h-0 left-0 top-[100px] z-40 flex flex-col`,
  tw`transition-all duration-500 bg-gray-background overflow-hidden`,
  tw`md:hidden`,
  isOpen && tw`h-[calc(100vh - 100px)] px-8`,
])

type WalletConnectorProps = {
  handleConnect: () => void
  handleDisconnect: () => void
}

const WalletConnector: FC<WalletConnectorProps> = ({
  handleConnect,
  handleDisconnect,
}) => {
  const { account, isConnected } = useIsConnected()
  const { t } = useTranslation("header")
  return isConnected ? (
    <>
      <div tw="hidden md:visible md:display[inline-flex]">
        <NetworkDropdown />
      </div>

      <Button
        label={shortenAddress(account!)}
        onClick={() => {
          handleDisconnect()
        }}
        icon={{ position: "left", component: <FaUserAlt size={16} /> }}
      />
    </>
  ) : (
    <Button
      label={t("connect")}
      onClick={handleConnect}
      icon={{ position: "right", component: <FaLink size={20} /> }}
    />
  )
}

const Menu: FC = () => {
  const { t } = useTranslation("header")
  return (
    <div tw="w-full text-white md:ml-20">
      <ul tw="w-full flex flex-col mb-8 md:mb-0 md:flex-row">
        <MenuListItem
          label={t("menu.home")}
          href="/"
          icon={<FaHome tw="text-2xl md:text-xl" />}
        />
        <MenuListItem
          label={t("menu.results")}
          href="results"
          icon={<TbNumbers tw="text-2xl md:text-xl" />}
        />
        <MenuListItem
          label={t("menu.about")}
          href="/about"
          icon={<FaInfoCircle tw="text-2xl md:text-xl" />}
        />
        <MenuListItem
          label={t("menu.devlog")}
          href="/devlog"
          icon={<FaDev tw="text-2xl md:text-xl" />}
        />
      </ul>
    </div>
  )
}

const MobileMenu: FC<{ children: ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const setScrollable = useScrollable()

  useEffect(() => {
    setScrollable(!isMobileMenuOpen)
  }, [isMobileMenuOpen])

  return (
    <div tw="w-full flex justify-center items-center md:w-auto md:mb-0 md:pl-20 md:hidden">
      <NetworkDropdown />
      <HamburgerMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />
      <MobileMenuDropdown isOpen={isMobileMenuOpen}>
        <Menu />
        {children}
      </MobileMenuDropdown>
    </div>
  )
}

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
