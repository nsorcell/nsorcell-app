import { GradientText, Text } from "components/typography"
import { NetworkAttribute, networkSelectionConfig } from "config/networks"
import { useAppDispatch, useAppSelector } from "hooks/store"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { FaChevronDown, FaNetworkWired } from "react-icons/fa"
import { VscDebugDisconnect } from "react-icons/vsc"
import { disconnect, initiateSwitchChain } from "store/features/web3/actions"
import tw, { styled } from "twin.macro"
import { ChainId } from "types/web3"

const DropdownContainer = styled.div<{ isOpen: boolean }>(({ isOpen }) => [
  tw`opacity-0 shadow-2xl invisible transition-all duration-300 transform origin-top-right -translate-y-2 scale-95`,
  isOpen && tw`visible opacity-100 translate[0] scale-100`,
])

const MenuItem = tw.a`text-white flex justify-between w-full px-4 py-2 hover:bg-gray-700 active:bg-gray-700 cursor-pointer`

interface ListItemProps extends NetworkAttribute {
  onClick?: () => void
}

const ListItem: FC<ListItemProps> = ({ label, icon, onClick }) => {
  return (
    <MenuItem tabIndex={0} role="menuitem" onClick={onClick}>
      <Text variant="body1" tw="flex items-center gap-2">
        {icon && icon}
        {label}
      </Text>
    </MenuItem>
  )
}

const renderNetworkOptions = (
  networkConfig: typeof networkSelectionConfig,
  filterType: NetworkAttribute["type"],
  callback?: () => void
) => {
  const dispatch = useAppDispatch()

  const onClick = useCallback(
    (chainId: ChainId) => () => {
      dispatch(initiateSwitchChain(chainId))
      callback && callback()
    },
    [callback]
  )

  return Object.entries(networkConfig)
    .filter(([_, props]) => props.type === filterType)
    .map(([chainId, props]) => (
      <ListItem
        key={chainId}
        {...props}
        onClick={onClick(parseInt(chainId) as ChainId)}
      />
    ))
}

const Drodown: FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const { chainId } = useAppSelector((state) => state.web3)
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

  useEffect(() => {
    function handleClickOutside(event: DocumentEventMap["mousedown"]) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        console.log("here")
        toggleDropdown(false)()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div
      tw="w-full relative inline-block text-left max-w-[250px] z-50"
      ref={dropdownRef}
    >
      <span tw="rounded-md shadow-sm">
        <button
          onClick={toggleDropdown()}
          tw="inline-flex justify-center items-center w-full px-1 py-3 text-sm font-medium leading-5 transition duration-150 ease-in-out bg-transparent rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 active:bg-gray-700 active:text-gray-800"
          type="button"
          aria-haspopup="true"
          aria-expanded="true"
          aria-controls="headlessui-menu-items-117"
        >
          <span tw="mr-2">
            <FaNetworkWired size={20} tw="text-white" />
          </span>
          <Text variant="body1" tw="text-white">
            Network:{" "}
            <GradientText tw="font-bold">
              {networkSelectionConfig[chainId].label.split(" ")[0]}
            </GradientText>
          </Text>
          <FaChevronDown size={16} tw="ml-2 text-gray-200" />
        </button>
      </span>
      <DropdownContainer isOpen={isDropdownOpen}>
        <div
          tw="absolute right-0 w-56 mt-2 origin-top-right bg-panel divide-y divide-gray-800 rounded-md shadow-lg outline-none"
          aria-labelledby="headlessui-menu-button-1"
          id="headlessui-menu-items-117"
          role="menu"
        >
          <div tw="px-4 py-3">
            <Text variant="body1" tw=" text-white">
              Network
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
        </div>
      </DropdownContainer>
    </div>
  )
}

export default Drodown
