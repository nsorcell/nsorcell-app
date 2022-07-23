import Button from "components/button"
import { Domain } from "components/lottery/types"
import { getBottomText, getSelectCount } from "components/lottery/utils"
import { Text } from "components/typography"
import useIsConnected from "hooks/useIsConnected"
import { useTranslation } from "next-i18next"
import { FC } from "react"
import { FaRegGrinWink, FaRocket } from "react-icons/fa"
import "twin.macro"
import { BottomActionsContainer, InstructionPill } from "./lottery.styled"

type BottomActionsProps = {
  domain: Domain
  choices: number
  isLoading: boolean
  inGame?: boolean
  submit: () => void
}

const BottomActions: FC<BottomActionsProps> = ({
  domain,
  choices,
  isLoading,
  inGame = false,
  submit,
}) => {
  const { isConnected } = useIsConnected()
  const { t } = useTranslation("lottery")

  return (
    <BottomActionsContainer>
      <InstructionPill>
        <Text tw="text-dark-purple-500" variant="label">
          {getBottomText(domain, choices, isConnected, isLoading, inGame)}
        </Text>
      </InstructionPill>

      <Button
        isLoading={isLoading}
        disabled={!isConnected || getSelectCount(domain) !== choices || inGame}
        label={inGame ? "In Game" : t("letsWin")}
        onClick={submit}
        icon={{
          position: "right",
          component: inGame ? (
            <FaRegGrinWink tw="text-white" size={20} />
          ) : (
            <FaRocket tw="text-white" size={20} />
          ),
        }}
      />
    </BottomActionsContainer>
  )
}

export default BottomActions
