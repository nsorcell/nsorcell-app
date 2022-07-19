import HamburgerMenu from "components/menu/hamburger-menu"
import NetworkDropdown from "components/network-dropdown"
import useScrollable from "hooks/useScrollable"
import { FC, ReactNode, useEffect, useState } from "react"
import "twin.macro"
import Menu from "./menu"
import { MobileMenuDropdown } from "./menu.styled"

export const MobileMenu: FC<{ children: ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const setScrollable = useScrollable()

  useEffect(() => {
    setScrollable(!isMobileMenuOpen)
  }, [isMobileMenuOpen])

  return (
    <div tw="w-full flex justify-center items-center md:w-auto md:mb-0 md:pl-20 md:hidden">
      <NetworkDropdown />
      <HamburgerMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />
      <MobileMenuDropdown isOpen={isMobileMenuOpen}>
        <Menu />
        {children}
      </MobileMenuDropdown>
    </div>
  )
}

export default MobileMenu
