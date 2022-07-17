import { GradientText, Text } from "components/typography"
import { formatEther } from "ethers/lib/utils"
import { useAppSelector } from "hooks/store"
import { FC } from "react"
import "twin.macro"
import { HeadingContainer } from "./heading.styled"

const Heading: FC = () => {
  const { state, prizePool } = useAppSelector((state) => state.lottery)

  return (
    <HeadingContainer>
      <Text variant="h1">
        Win
        {
          <GradientText tw="animate-pulse">
            {` ${formatEther(prizePool)} Ether `}
          </GradientText>
        }
        by entering the Lottery!
      </Text>

      <Text variant="subtitle1" tw="text-gray-400 mt-6">
        Simply choose your <b tw="font-weight[700]">6</b> most favorite numbers,
        enter, and wait for the draw.
      </Text>
    </HeadingContainer>
  )
}

export default Heading
