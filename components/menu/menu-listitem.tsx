import { Text } from "components/typography"
import Link from "next/link"
import { FC, ReactNode } from "react"
import "twin.macro"

const MenuListItem: FC<{ label: string; href?: string; icon?: ReactNode }> = ({
  label,
  href = "#",
  icon,
}) => {
  return (
    <li tw="flex justify-center items-center my-6 md:my-0 md:mr-20 cursor-pointer">
      <Link href={href}>
        <a tw="flex">
          <span tw="flex items-center mr-2">{icon}</span>
          <Text variant="body1" tw="text-xl md:text-base">
            {label}
          </Text>
        </a>
      </Link>
    </li>
  )
}

export default MenuListItem
