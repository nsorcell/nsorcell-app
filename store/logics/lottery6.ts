import { Lottery6__factory } from "@nsorcell/protocol"
import { LuckyNumbers } from "components/lottery/types"
import { LOTTERY_6 } from "config/contract-addresses"
import { parseEther } from "ethers/lib/utils"
import { createLogic } from "redux-logic"
import {
  enter,
  enterCanceled,
  enterFailed,
  enterSuccessful,
} from "store/features/lottery6"
import { RootState } from "store/store"

const enterLogic = createLogic<{}, LuckyNumbers>({
  type: enter.type,
  cancelType: enterCanceled.type,
  validate({ getState, action }, allow, reject) {
    const { web3 } = getState() as RootState

    if (!web3.account || !web3.chainId || !web3.provider) {
      reject(enterFailed())
    }

    allow(enter(action.payload.sort((a, b) => a - b)))
  },
  async process({ getState, action }, _, done) {
    const { web3 } = getState() as RootState

    const lottery6 = Lottery6__factory.connect(
      LOTTERY_6[4],
      web3.provider!.getSigner()
    )

    try {
      await lottery6.enter(action.payload, { value: parseEther("0.1") })
    } catch (e) {
    } finally {
      done()
    }
  },

  processOptions: {
    successType: enterSuccessful.type,
    failType: enterFailed.type,
  },
})

export default [enterLogic]
