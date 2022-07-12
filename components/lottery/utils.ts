import range from "ramda/src/range"
import { Domain } from "./types"

export const getInitialDomain = (domainSize: number): Domain =>
  Object.fromEntries(range(1, domainSize + 1).map((n) => [n, false]))

export const getSelected = (domain: Domain) =>
  Object.entries(domain)
    .filter(([, selected]) => selected)
    .map(([number]) => parseInt(number))
    .sort((a: number, b: number) => a - b)

export const getSelectCount = (domain: Domain) => getSelected(domain).length

export const getRemainingText = (domain: Domain, choices: number) => {
  const selectedCount = getSelectCount(domain)

  if (selectedCount === 0) {
    return `Pick your ${choices} lucky numbers`
  }

  if (![0, 6].includes(selectedCount)) {
    return `You have ${choices - selectedCount} empty slots left`
  }

  return "Nice you have filled all the slots!"
}
