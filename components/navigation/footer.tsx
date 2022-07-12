import { Text } from "components/typography"
import { FC } from "react"
import "twin.macro"
import { FooterContainer } from "./navigation.styled"

const FooterList: FC<{ heading: string; items: string[] }> = ({
  heading,
  items,
}) => (
  <ul tw="flex flex-col md:mr-20">
    <li tw="mb-5">
      <Text variant="body1" tw="text-white uppercase">
        {heading}
      </Text>
    </li>
    <>
      {items.map((item) => (
        <li key={item} tw="mb-5">
          <Text variant="subtitle2" tw="text-gray-400">
            {item}
          </Text>
        </li>
      ))}
    </>
  </ul>
)

const Footer: FC = () => (
  <FooterContainer>
    <div tw="flex flex-col md:flex-row">
      <FooterList heading="Resurces" items={["Next", "TailwindCSS"]} />
      <FooterList heading="Follow us" items={["Github", "LinkedIn"]} />
      <FooterList
        heading="Legal"
        items={["Privacy Policy", "Terms & Conditions"]}
      />
    </div>
  </FooterContainer>
)

export default Footer
