import { Lottery6 } from "@nsorcell/protocol"
import { BigNumber } from "ethers"
import { History, LotteryState } from "types/store"

type FetchStateResponse = [
  BigNumber,
  string[],
  Lottery6.HistoryStructOutput[],
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
]

export const transformFetchStateResult = ([
  resState,
  resPlayers,
  resHistory,
  resDrawInterval,
  resNumberOfDraws,
  resLastDraw,
  resPrizePool,
]: FetchStateResponse) => {
  const history = resHistory.reduce<History>(
    (acc, [winningNumbers, winners], i) => {
      return {
        ...acc,
        [i]: {
          winningNumbers: winningNumbers.map((n) => n.toNumber()),
          winners,
        },
      }
    },
    {} as History
  )

  const states: LotteryState[] = ["STANDBY", "OPEN", "DRAWING", "CALCULATING"]
  const state_: LotteryState = states[resState.toNumber()]
  const drawInterval = resDrawInterval.toNumber()
  const lastDraw = resLastDraw.toNumber()
  const numberOfDraws = resNumberOfDraws.toNumber()
  const prizePool = resPrizePool.toString()

  return {
    state: state_,
    players: resPlayers,
    history,
    drawInterval,
    lastDraw,
    numberOfDraws,
    prizePool,
  }
}
