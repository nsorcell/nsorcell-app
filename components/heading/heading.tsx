import { GradientText, Text } from "components/typography"
import { FC } from "react"
import "twin.macro"
import { HeadingContainer } from "./heading.styled"

const Heading: FC = () => {
  return (
    <HeadingContainer>
      <Text variant="h1">
        <div>The very first</div>
        {<GradientText tw="animate-pulse">Ethereum</GradientText>} Lottery
      </Text>

      <Text variant="subtitle1" tw="text-gray-400 mt-6">
        Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast
        yardarm. Pinnace holystone mizzenmast quarter crow's nest nipperkin grog
        yardarm hempen halter furl. Swab barque interloper chantey doubloon
        starboard grog black jack gangway rutters. Deadlights jack lad schooner.
        Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet
        transom heave to.
      </Text>
    </HeadingContainer>
  )
}

export default Heading
