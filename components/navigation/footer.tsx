import { Text } from "components/typography"
import { useTranslation } from "next-i18next"
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

const Footer: FC = () => {
  const { t } = useTranslation("footer")
  return (
    <FooterContainer>
      <div tw="flex flex-col md:flex-row">
        <FooterList
          heading={t("resources.resources")}
          items={[t("resources.next"), t("resources.tailwind")]}
        />
        <FooterList
          heading={t("social.social")}
          items={[t("social.github"), t("social.linkedin")]}
        />
        <FooterList
          heading={t("legal.legal")}
          items={[t("legal.privacy"), t("legal.terms")]}
        />
      </div>
    </FooterContainer>
  )
}

export default Footer
