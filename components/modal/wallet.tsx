import ProviderItem, {
  ConnectorNames,
  providerItems,
} from "components/provider-service/provider-service"
import { Text } from "components/typography"
import useConnectionManager from "hooks/useConnectionManager"
import { useTranslation } from "next-i18next"
import { ComponentProps, FC, useEffect, useRef } from "react"
import { FaWindowClose } from "react-icons/fa"
import Modal from "react-modal"
import tw, { theme } from "twin.macro"

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
    zIndex: 50,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: theme`colors.gray-background`,
    color: "white",
    border: "none",
    borderRadius: "20px",
    padding: "40px",
  },
}

const CloseButton = tw.button`absolute right-4 top-4`

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
      <Text tw="pt-4 pb-8" variant="h5">
        {t("preferredProvider")}
      </Text>
      <div tw="h-[0.5px] mb-8 bg-gray-600" />
      <CloseButton onClick={close}>
        <FaWindowClose size={20} />
      </CloseButton>
      <div tw="flex justify-center">
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
