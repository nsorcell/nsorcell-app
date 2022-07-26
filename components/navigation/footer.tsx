import { Text } from "components/typography"
import { useTranslation } from "next-i18next"
import { FC, ReactNode } from "react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import "twin.macro"
import { FooterContainer } from "./navigation.styled"

const FooterList: FC<{ heading: string; items: (string | ReactNode)[] }> = ({
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
      {items.map((item, i) => (
        <li key={`footer-item-${i}`} tw="mb-5">
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
          items={[
            <a
              href="https://github.com/nsorcell"
              target="_blank"
              tw="flex gap-1 items-center"
            >
              <FaGithub tw="text-white" />

              {t("social.github")}
            </a>,
            <a
              href="https://www.linkedin.com/in/daniel-tok-015ba6120/"
              target="_blank"
              tw="flex gap-1 items-center"
            >
              <div tw="bg-white box-shadow[inset 2px 2px black, inset -2px -2px black]">
                <FaLinkedin tw="text-blue-500" />
              </div>

              {t("social.linkedin")}
            </a>,
          ]}
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
