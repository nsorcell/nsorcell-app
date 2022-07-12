import Button from "components/button"
import { WalletModal } from "components/modal"
import { Text } from "components/typography"
import useConnectionManager from "hooks/useConnectionManager"
import useIsConnected from "hooks/useIsConnected"
import { useTranslation } from "next-i18next"
import Image from "next/image"
import Link from "next/link"
import { FC, ReactNode, useState } from "react"
import { FaDev, FaHome, FaInfoCircle, FaLink, FaUserAlt } from "react-icons/fa"
import tw from "twin.macro"
import { shortenAddress } from "utils/address"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

const HeaderContainer = tw.header`w-full flex flex-col justify-between items-center py-8 md:flex-row`

const MenuListItem: FC<{ label: string; href?: string; icon?: ReactNode }> = ({
  label,
  href = "#",
  icon,
}) => {
  return (
    <li tw="flex items-center my-4 md:my-0 md:mr-20 cursor-pointer">
      <Link href={href}>
        <a tw="flex">
          <span tw="mr-2">{icon}</span>
          <Text variant="body1">{label}</Text>
        </a>
      </Link>
    </li>
  )
}

const Header: FC = () => {
  const { t } = useTranslation("header")
  const { account, isConnected } = useIsConnected()
  const { handleDisconnect } = useConnectionManager()
  const [modalIsOpen, setIsOpen] = useState(false)

  return (
    <HeaderContainer>
      <div tw="flex mb-8 md:mb-0 md:pl-20">
        <Image
          src="/images/nsorcell.svg"
          width={80}
          height={80}
          alt="nsorcell"
        />
      </div>
      <div tw="flex flex-col items-center w-full px-16 md:flex-row">
        <div tw="w-full text-white md:ml-20">
          <ul tw="flex items-center flex-col mb-8 md:mb-0 md:flex-row">
            <MenuListItem label="Home" icon={<FaHome size={20} />} />
            <MenuListItem label="About" icon={<FaInfoCircle size={20} />} />
            <MenuListItem label="Devlog" icon={<FaDev size={20} />} />
          </ul>
        </div>

        <div>
          {isConnected ? (
            <Button
              label={shortenAddress(account!)}
              onClick={() => {
                handleDisconnect()
                console.log({ isConnected })
              }}
              icon={{ position: "left", component: <FaUserAlt size={16} /> }}
            />
          ) : (
            <Button
              label={t("connect")}
              onClick={() => setIsOpen(true)}
              icon={{ position: "right", component: <FaLink size={20} /> }}
            />
          )}
        </div>
      </div>
      <WalletModal isOpen={modalIsOpen} close={() => setIsOpen(false)} />
    </HeaderContainer>
  )
}
export default Header
