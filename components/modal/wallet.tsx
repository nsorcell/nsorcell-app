import ProviderItem, {
  ConnectorNames,
  providerItems,
} from "components/provider-service/provider-service"
import { Text } from "components/typography"
import useConnectionManager from "hooks/useConnectionManager"
import { useTranslation } from "next-i18next"
import { ComponentProps, FC, useEffect, useRef } from "react"
import Modal from "react-modal"
import tw from "twin.macro"

interface WalletModalProps extends ComponentProps<typeof Modal> {
  close: () => void
}

const customStyles = {
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

const CloseButton = tw.button`absolute right-1 top-0`

const WalletModal: FC<WalletModalProps> = ({ close, ...props }) => {
  const { t } = useTranslation("modal")
  const { handleConnect } = useConnectionManager()
  const appElement = useRef<HTMLElement>()

  const onConnect = (walletType: ConnectorNames) => () => {
    handleConnect(walletType)
    close()
  }

  useEffect(() => {
    appElement.current = document.querySelector("#__next")! as HTMLElement
  })

  return (
    <Modal {...props} style={customStyles} appElement={appElement.current}>
      <Text tw="text-2xl py-4" variant="subtitle1">
        {t("preferredProvider")}
      </Text>
      <hr />
      <CloseButton onClick={close}>
        <Text tw="text-xl hover:bg-gray-200 py-0.5 px-2" variant="body1">
          x
        </Text>
      </CloseButton>
      <div>
        {providerItems.map((item) => (
          <ProviderItem
            key={item.name}
            {...item}
            handleConnect={onConnect(item.connectorName)}
          />
        ))}
      </div>
    </Modal>
  )
}

export default WalletModal
