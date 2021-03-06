import Button from "components/button"
import NetworkDropdown from "components/network-dropdown"
import useIsConnected from "hooks/useIsConnected"
import { useTranslation } from "next-i18next"
import { FC } from "react"
import { FaLink, FaUserAlt } from "react-icons/fa"
import "twin.macro"
import { shortenAddress } from "utils/address"

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
  return (
    <>
      {
        <div tw="hidden md:visible md:display[inline-flex]">
          <NetworkDropdown />
        </div>
      }
      <div tw="mt-auto pb-4 md:pb-0 md:mt-0">
        {isConnected ? (
          <>
            <Button
              tw="mt-auto"
              label={shortenAddress(account!)}
              onClick={() => {
                handleDisconnect()
              }}
              icon={{ position: "left", component: <FaUserAlt size={16} /> }}
            />
          </>
        ) : (
          <Button
            tw="mt-auto"
            label={t("connect")}
            onClick={handleConnect}
            icon={{ position: "right", component: <FaLink size={20} /> }}
          />
        )}
      </div>
    </>
  )
}

export default WalletConnector
