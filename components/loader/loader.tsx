import range from "ramda/src/range"
import { FC } from "react"
import { Circle, Shadow, Wrapper } from "./loader.styled"

export type NthChild = 0 | 1 | 2

export type Size = "sm" | "md" | "lg"

const Loader: FC<{ size: Size }> = ({ size }) => {
  const r = range(0, 3)

  return (
    <Wrapper size={size}>
      {r.map((n) => (
        <Circle nth={n as NthChild} key={n} />
      ))}
      {r.map((n) => (
        <Shadow nth={n as NthChild} key={n} />
      ))}
    </Wrapper>
  )
}

export default Loader
