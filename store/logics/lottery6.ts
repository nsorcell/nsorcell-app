import { providers } from "@0xsequence/multicall"
import { Lottery6__factory } from "@nsorcell/protocol"
import { LuckyNumbers } from "components/lottery/types"
import { LOTTERY_6 } from "config/contract-addresses"
import { parseEther } from "ethers/lib/utils"
import { createLogic } from "redux-logic"
import {
  enter,
  enterCanceled,
  fetchStats,
  fetchStatsReceived,
} from "store/features/lottery6/actions"
import {
  actionFailed,
  toggleWaitForApproval,
} from "store/features/web3/actions"
import { RootState } from "store/store"
import { LotteryState } from "types/store"

const fetchStatsLogic = createLogic({
  type: fetchStats.type,
  validate({ getState }, allow, reject) {
    const { web3 } = getState() as RootState

    if (!web3.account || !web3.chainId || !web3.provider) {
      reject(
        actionFailed({
          reason: `Web3 properties are missing: ${JSON.stringify(web3)}`,
        })
      )
    }

    allow(fetchStats())
  },
  async process({ getState }, dispatch, done) {
    const { web3 } = getState() as RootState

    const lottery = Lottery6__factory.connect(
      LOTTERY_6[web3.chainId],
      new providers.MulticallProvider(web3.provider!)
    )

    const [
      resState,
      resPlayers,
      resHistory,
      resDrawInterval,
      resNumberOfDraws,
      resLastDraw,
      resPrizePool,
    ] = await Promise.all([
      await lottery.getState(),
      await lottery.getPlayers(),
      await lottery.getHistory(),
      await lottery.getDrawInterval(),
      await lottery.getNumberOfDraws(),
      await lottery.getLastDrawTimestamp(),
      await web3.provider!.getBalance(lottery.address),
    ])

    const history = resHistory.reduce((acc, [winningNumbers, winners], i) => {
      return {
        ...acc,
        [i]: {
          winningNumbers: winningNumbers.map((n) => n.toNumber()),
          winners,
        },
      }
    }, {})

    const states: LotteryState[] = ["STANDBY", "OPEN", "DRAWING", "CALCULATING"]
    const state: LotteryState = states[resState.toNumber()]
    const drawInterval = resDrawInterval.toNumber()
    const lastDraw = resLastDraw.toNumber()
    const numberOfDraws = resNumberOfDraws.toNumber()
    const prizePool = resPrizePool.toString()

    dispatch(
      fetchStatsReceived({
        players: resPlayers,
        history,
        state,
        lastDraw,
        drawInterval,
        numberOfDraws,
        prizePool,
      })
    )

    done()
  },
})

const enterLogic = createLogic<{}, LuckyNumbers>({
  type: enter.type,
  cancelType: enterCanceled.type,
  validate({ getState, action }, allow, reject) {
    const { web3 } = getState() as RootState

    if (!web3.account || !web3.chainId || !web3.provider) {
      reject(
        actionFailed({
          reason: `Web3 properties are missing: ${JSON.stringify(web3)}`,
        })
      )
    }

    allow(enter(action.payload.sort((a, b) => a - b)))
  },
  async process({ getState, action }, dispatch, done) {
    const { web3 } = getState() as RootState

    const lottery = Lottery6__factory.connect(
      LOTTERY_6[web3.chainId],
      web3.provider!.getSigner()
    )

    try {
      dispatch(toggleWaitForApproval())

      await lottery.enter(action.payload, { value: parseEther("0.1") })
    } catch (e) {
    } finally {
      dispatch(toggleWaitForApproval())
      done()
    }
  },

  processOptions: {},
})

export default [enterLogic, fetchStatsLogic]
