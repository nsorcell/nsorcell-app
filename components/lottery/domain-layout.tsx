import { FC } from "react"
import { Number, NumberContainer, NumberGradient } from "./lottery.styled"
import { Domain } from "./types"

type DomainLayoutProps = {
  domain: Domain
  toggle: (n: number) => () => void
}

const DomainLayout: FC<DomainLayoutProps> = ({ domain, toggle }) => (
  <NumberContainer>
    {Object.keys(domain).map((n) => (
      <NumberGradient key={`domain-${n}`} selected={domain[parseInt(n)]}>
        <Number onClick={toggle(parseInt(n))}>
          {`${n}`.length > 1 ? n : ` ${n}`}
        </Number>
      </NumberGradient>
    ))}
  </NumberContainer>
)

export default DomainLayout
