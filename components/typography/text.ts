import styled from "styled-components"
import tw from "twin.macro"

import { styles, Variant } from "./styles"

type Props = {
  variant: Variant
}

export const GradientText = tw.span`text-transparent bg-clip-text bg-gradient-to-b from-gradient-1 via-gradient-2 to-gradient-3`

export const Text = styled.div<Props>`
  ${({ variant }) => [
    styles[variant],
    ["h1", "h2", "h3", "h4", "h5", "h6", "label"].includes(variant)
      ? tw`text-center`
      : tw`text-justify`,
    tw`md:text-left`,
  ]};
`

export default Text
