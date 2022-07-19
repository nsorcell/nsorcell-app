import { useTranslation } from "next-i18next"
import { FC } from "react"
import { FaDev, FaHome, FaInfoCircle } from "react-icons/fa"
import { TbNumbers } from "react-icons/tb"
import "twin.macro"
import MenuListItem from "./menu-listitem"

export const Menu: FC = () => {
  const { t } = useTranslation("header")
  return (
    <div tw="w-full text-white md:ml-20">
      <ul tw="w-full flex flex-col mb-8 md:mb-0 md:flex-row">
        <MenuListItem
          label={t("menu.home")}
          href="/"
          icon={<FaHome tw="text-2xl md:text-xl" />}
        />
        <MenuListItem
          label={t("menu.results")}
          href="results"
          icon={<TbNumbers tw="text-2xl md:text-xl" />}
        />
        <MenuListItem
          label={t("menu.about")}
          href="/about"
          icon={<FaInfoCircle tw="text-2xl md:text-xl" />}
        />
        <MenuListItem
          label={t("menu.devlog")}
          href="/devlog"
          icon={<FaDev tw="text-2xl md:text-xl" />}
        />
      </ul>
    </div>
  )
}

export default Menu
