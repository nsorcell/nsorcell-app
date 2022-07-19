import Loader from "components/loader"
import { GradientText, Text } from "components/typography"
import { formatEther } from "ethers/lib/utils"
import { useAppSelector } from "hooks/store"
import { useTranslation } from "next-i18next"
import { FC } from "react"
import "twin.macro"
import { HeadingContainer } from "./heading.styled"

const Heading: FC = () => {
  const { state, prizePool } = useAppSelector((state) => state.lottery)
  const { t } = useTranslation("heading")

  return (
    <HeadingContainer>
      <Text variant="h1">
        {t("win")}
        {
          <GradientText tw="animate-pulse">
            {` ${formatEther(prizePool)} ${t("ether")} `}
          </GradientText>
        }
        {t("byEntering")}
      </Text>

      <Text variant="h5" tw="flex text-gray-400 mt-6">
        {t("lotteryState")}
        {state === "INITIAL" ? (
          <div tw="relative w-20 h-8">
            <Loader size="md" />
          </div>
        ) : (
          state
        )}
      </Text>
      <Text variant="subtitle1" tw="text-gray-400 mt-6">
        {t("chooseInstructions", { number: 6 })}
      </Text>
    </HeadingContainer>
  )
}

export default Heading
