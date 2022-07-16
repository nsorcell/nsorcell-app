import { FC } from "react"
import tw, { styled } from "twin.macro"

import { styles, Variant } from "./styles"

type Props = {
  variant: Variant
}

export const GradientText = tw.span`text-transparent bg-clip-text bg-gradient-to-b from-gradient-1 via-gradient-2 to-gradient-3`

export const GradientIcon: FC<{
  name: string
  colorStops: {
    color: string
    offset: string
  }[]
  direction?: {
    x1?: string
    x2?: string
    y1?: string
    y2?: string
  }
}> = ({ name, colorStops, direction }) => {
  return (
    <svg width="0" height="0">
      <linearGradient id={`gradient-${name}`} {...direction}>
        {colorStops.map(({ color, offset }) => (
          <stop stopColor={color} offset={offset} />
        ))}
      </linearGradient>
    </svg>
  )
}

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
