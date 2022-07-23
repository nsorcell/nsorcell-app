import { GradientText, Text } from "components/typography"
import { formatEther } from "ethers/lib/utils"
import { useAppSelector } from "hooks/store"
import { useTranslation } from "next-i18next"
import { FC } from "react"
import "twin.macro"
import DrawDisplay from "./draw-display"
import { HeadingContainer } from "./heading.styled"

const Heading: FC = () => {
  const { prizePool } = useAppSelector((state) => state.lottery)
  const { t } = useTranslation("heading")

  return (
    <HeadingContainer>
      <Text variant="h1" tw="text-left">
        {t("win")}
        {
          <GradientText tw="animate-pulse">
            {` ${formatEther(prizePool)} ${t("ether")} `}
          </GradientText>
        }
        {t("byEntering")}
      </Text>
      <DrawDisplay />
      <Text variant="subtitle1" tw="text-gray-400 mt-6">
        {t("chooseInstructions", { number: 6 })}
      </Text>
    </HeadingContainer>
  )
}

export default Heading
