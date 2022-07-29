import countBy from "ramda/src/countBy"
import id from "ramda/src/identity"
import { History } from "types/store"

export const getPlayerHits = (
  account: string,
  history: History,
  iteration: number
) => {
  const { results } = history[iteration]

  return results.indexOf(results.find((n) => n.includes(account)) ?? [])
}

export const getDistribution = (history: History) => {
  const allNumbers = Object.values(history).flatMap(
    ({ winningNumbers }) => winningNumbers
  )

  return countBy(id, allNumbers)
}
