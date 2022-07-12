import { Text } from "components/typography"
import { FC } from "react"
import "twin.macro"
import { Slot, SlotsContainer } from "./lottery.styled"
import { Domain } from "./types"
import { getSelectCount, getSelected } from "./utils"

type SelectedNumbersProps = {
  domain: Domain
  choices: number
  toggle: (n: number) => () => void
}

const SelectedNumbers: FC<SelectedNumbersProps> = ({
  domain,
  choices,
  toggle,
}) => (
  <SlotsContainer>
    {getSelected(domain)
      .concat(new Array(choices - getSelectCount(domain)).fill(false))
      .map((n, i) => (
        <Slot
          filled={Boolean(n)}
          index={i}
          onClick={toggle(n)}
          key={`${n}-${i}`}
        >
          <Text tw="text-white" variant="h5">
            {n}
          </Text>
        </Slot>
      ))}
  </SlotsContainer>
)

export default SelectedNumbers
