import { Text } from "components/typography"
import { NetworkAttribute, networkSelectionConfig } from "config/networks"
import { useAppDispatch } from "hooks/store"
import { useTranslation } from "next-i18next"
import { FC, useCallback } from "react"
import { initiateSwitchChain } from "store/features/web3/actions"
import "twin.macro"
import { ChainId } from "types/web3"
import { MenuItem } from "./network-dropdown.styled"

interface ListItemProps extends NetworkAttribute {
  onClick?: () => void
}

export const ListItem: FC<ListItemProps> = ({ label, icon, onClick }) => {
  const { t } = useTranslation("header")
  return (
    <MenuItem tabIndex={0} role="menuitem" onClick={onClick} className="group">
      <Text variant="body1" tw="flex items-center gap-4">
        <>
          <span tw="animate-wiggle group-hover:animate-spin">
            {icon && icon}
          </span>
          {t(label as any)}
        </>
      </Text>
    </MenuItem>
  )
}

export const renderNetworkOptions = (
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
