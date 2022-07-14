import Button from "components/button"
import { Domain } from "components/lottery/types"
import { getRemainingText, getSelectCount } from "components/lottery/utils"
import { Text } from "components/typography"
import useIsConnected from "hooks/useIsConnected"
import { FC } from "react"
import { FaRocket } from "react-icons/fa"
import "twin.macro"
import { BottomActionsContainer, InstructionPill } from "./lottery.styled"

type BottomActionsProps = {
  domain: Domain
  choices: number
  isLoading: boolean
  submit: () => void
}

const BottomActions: FC<BottomActionsProps> = ({
  domain,
  choices,
  isLoading,
  submit,
}) => {
  const { isConnected } = useIsConnected()

  return (
    <BottomActionsContainer>
      <InstructionPill>
        <Text tw="text-dark-purple-500" variant="label">
          {isConnected
            ? getRemainingText(domain, choices)
            : "You have to connect to play."}
        </Text>
      </InstructionPill>

      <Button
        isLoading={isLoading}
        disabled={!isConnected || getSelectCount(domain) !== choices}
        label="Let's Win!"
        onClick={submit}
        icon={{
          position: "right",
          component: <FaRocket tw="text-white" size={20} />,
        }}
      />
    </BottomActionsContainer>
  )
}

export default BottomActions
