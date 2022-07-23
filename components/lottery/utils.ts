import range from "ramda/src/range"
import { globalT } from "utils/globalT"
import { Domain, LuckyNumbers } from "./types"

export const getInitialDomain = (
  domainSize: number,
  playerNumbers?: LuckyNumbers
): Domain =>
  Object.fromEntries(
    range(1, domainSize + 1).map((n) => [
      n,
      playerNumbers ? playerNumbers.includes(n) : false,
    ])
  )

export const getSelected = (domain: Domain) =>
  Object.entries(domain)
    .filter(([, selected]) => selected)
    .map(([number]) => parseInt(number))
    .sort((a: number, b: number) => a - b)

export const getSelectCount = (domain: Domain) => getSelected(domain).length

export const getBottomText = (
  domain: Domain,
  choices: number,
  isConnected: boolean,
  isLoading: boolean,
  inGame: boolean
) => {
  const selectedCount = getSelectCount(domain)

  if (!isConnected) {
    return globalT("lottery:connectToPlay")
  }

  if (isLoading) {
    return globalT("lottery:loading")
  }

  if (inGame) {
    return globalT("lottery:alreadyInGame")
  }

  if (selectedCount === 0) {
    return globalT("lottery:pickNumber", { numbers: choices })
  }

  if (![0, 6].includes(selectedCount)) {
    return globalT("lottery:emptySlots", { slots: choices - selectedCount })
  }

  return globalT("lottery:filledAll")
}
