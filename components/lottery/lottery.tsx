import { GradientText, Text } from "components/typography"
import { useAppSelector } from "hooks/store"
import { useTranslation } from "next-i18next"
import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { enter } from "store/features/lottery6/actions"
import { fetchPlayerData } from "store/features/player/actions"
import "twin.macro"
import BottomActions from "./bottom-actions"
import DomainLayout from "./domain-layout"
import { LotteryContainer } from "./lottery.styled"
import SelectedNumbers from "./selected-numbers"
import { Domain, LotteryProps, LuckyNumbers } from "./types"
import { getInitialDomain, getSelectCount, getSelected } from "./utils"

const Lottery: FC<LotteryProps> = ({ choices, domainSize }) => {
  const { t } = useTranslation("lottery")

  const dispatch = useDispatch()

  const { waitingForApproval, account } = useAppSelector((state) => state.web3)
  const { isLoaded: isLotteryStateLoaded } = useAppSelector(
    (state) => state.lottery
  )
  const { numbers } = useAppSelector((state) => state.player)

  const inGame = useMemo(() => !!numbers, [numbers])

  const [domain, updateDomain] = useState<Domain>(getInitialDomain(domainSize))

  const toggle = useCallback(
    (n: number) => () => {
      if (!n || (getSelectCount(domain) === choices && !domain[n]) || inGame) {
        return
      }

      updateDomain({ ...domain, [n]: !domain[n] })
    },
    [domain, choices]
  )

  const submitNumbers = useCallback(() => {
    if (getSelectCount(domain) < choices || inGame) {
      return
    }

    const luckyNumbers = getSelected(domain) as LuckyNumbers

    dispatch(enter(luckyNumbers))
  }, [domain, choices])

  useEffect(() => {
    if (account) {
      dispatch(fetchPlayerData())
    }
  }, [account])

  useEffect(() => {
    if (numbers) {
      updateDomain(getInitialDomain(domainSize, numbers))
    }
  }, [numbers])

  return (
    <LotteryContainer>
      <Text variant="h5" tw="text-white mb-6">
        {inGame ? t("selected") : t("select")}{" "}
        {<GradientText>{t("winning")}</GradientText>} {t("numbers")}
      </Text>

      <DomainLayout domain={domain} toggle={toggle} />

      <div tw=" w-full h-[1px] my-6 bg-gray-800" />

      <Text variant="h5" tw="text-white mb-6">
        {<GradientText>{t("selected")}</GradientText>} {t("numbers")}
      </Text>
      <div tw="flex flex-col items-center">
        <SelectedNumbers domain={domain} choices={choices} toggle={toggle} />
        <BottomActions
          isLoading={!!waitingForApproval || !isLotteryStateLoaded}
          domain={domain}
          choices={choices}
          inGame={inGame}
          submit={submitNumbers}
        />
      </div>
    </LotteryContainer>
  )
}

export default Lottery
