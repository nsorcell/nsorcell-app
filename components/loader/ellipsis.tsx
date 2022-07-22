import { FC } from "react"
import "twin.macro"

const Ellipsis: FC = () => (
  <div tw="w-0 inline-block vertical-align[bottom] animate-ellipsis content['\2026']">
    ...
  </div>
)

export default Ellipsis
