import { GradientText, Text } from "components/typography"
import { networkSelectionConfig } from "config/networks"
import { useAppDispatch, useAppSelector } from "hooks/store"
import useClickAway from "hooks/useClickAway"
import { useTranslation } from "next-i18next"
import { FC, useCallback, useRef, useState } from "react"
import { FaChevronDown, FaNetworkWired } from "react-icons/fa"
import { VscDebugDisconnect } from "react-icons/vsc"
import { disconnect } from "store/features/web3/actions"
import "twin.macro"
import {
  DropdownButton,
  DropdownContainer,
  DropdownPanel,
} from "./network-dropdown.styled"
import { renderNetworkOptions } from "./utils"

const NetworkDropdown: FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const { chainId } = useAppSelector((state) => state.web3)
  const { t } = useTranslation("header")
  const dispatch = useAppDispatch()

  const toggleDropdown = useCallback(
    (value?: boolean) => () => {
      if (value !== undefined) {
        setIsDropdownOpen(value)
      } else {
        setIsDropdownOpen(!isDropdownOpen)
      }
    },
    [isDropdownOpen]
  )

  useClickAway(toggleDropdown(false), dropdownRef)

  return (
    <div
      tw="relative inline-block text-left min-w-[250px] z-50"
      ref={dropdownRef}
    >
      <span tw="rounded-md shadow-sm">
        <DropdownButton
          onClick={toggleDropdown()}
          type="button"
          aria-haspopup="true"
          aria-expanded="true"
          aria-controls="headlessui-dropdown"
        >
          <span tw="mr-2">
            <FaNetworkWired size={20} tw="text-white" />
          </span>
          <Text variant="body1" tw="text-white">
            {t("network")}:{" "}
            <GradientText tw="font-bold">
              {
                (
                  t(
                    (networkSelectionConfig[chainId]?.label as any) ?? ""
                  ) as string
                ).split(" ")[0]
              }
            </GradientText>
          </Text>
          <FaChevronDown size={16} tw="ml-2 text-gray-200" />
        </DropdownButton>
      </span>
      <DropdownContainer isOpen={isDropdownOpen}>
        <DropdownPanel
          tw="absolute right-0 w-56 mt-2 origin-top-right bg-panel divide-y divide-gray-800 rounded-md shadow-lg outline-none"
          aria-labelledby="headlessui-dropdown"
          id="headlessui-dropdown"
          role="menu"
        >
          <div tw="px-4 py-3">
            <Text variant="body1" tw=" text-white">
              {t("network")}
            </Text>
          </div>

          <div tw="py-1">
            {renderNetworkOptions(
              networkSelectionConfig,
              "mainnet",
              toggleDropdown(false)
            )}
          </div>
          <div tw="py-1">
            {renderNetworkOptions(
              networkSelectionConfig,
              "testnet",
              toggleDropdown(false)
            )}
          </div>
          {process.env.NODE_ENV === "development" && (
            <div tw="py-1">
              {renderNetworkOptions(
                networkSelectionConfig,
                "local",
                toggleDropdown(false)
              )}
            </div>
          )}
          <div tw="py-1">
            <a
              onClick={() => {
                dispatch(disconnect())
                toggleDropdown(false)()
              }}
              tabIndex={3}
              tw="text-gray-200 flex gap-2 w-full px-4 py-2 cursor-pointer hover:bg-gray-700"
              role="menuitem"
            >
              <VscDebugDisconnect size={20} />
              <Text variant="subtitle1">Disconnect</Text>
            </a>
          </div>
        </DropdownPanel>
      </DropdownContainer>
    </div>
  )
}

export default NetworkDropdown
