import { FC } from "react"
import tw, { styled } from "twin.macro"

const HDiv1 = styled.div<{ isOpen: boolean }>(({ isOpen }) => [
  tw`w-8 h-[3px] bg-white mb-2 rounded-full`,
  tw`transition-all transform[rotate(0)] duration-300 transition-delay[0s]  transform-origin[-30%]`,
  isOpen && tw`w-5 transform[rotate(45deg)] transition-delay[.3s]`,
])

const HDiv2 = styled.div<{ isOpen: boolean }>(({ isOpen }) => [
  tw`w-8 h-[3px] bg-white mb-2 rounded-full`,
  tw`transition-all transform[translateX(0)] transition-delay[.3s] opacity-100 duration-300`,
  isOpen && tw`transform[translateX(20px)] transition-delay[0s]  opacity-0`,
])

const HDiv3 = styled.div<{ isOpen: boolean }>(({ isOpen }) => [
  tw`w-8 h-[3px] bg-white mb-2 rounded-full`,
  tw`transition-all transform[rotate(0)] duration-300 transition-delay[0s] transform-origin[-25%]`,
  isOpen && tw`w-5 transform[rotate(-45deg)] transition-delay[.3s]`,
])

type HamburgerMenuProps = {
  isOpen: boolean
  setIsOpen: (to: boolean) => void
}

const HamburgerMenu: FC<HamburgerMenuProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div
      tw="flex flex-col justify-center items-end md:hidden cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <HDiv1 isOpen={isOpen} />
      <HDiv2 isOpen={isOpen} />
      <HDiv3 isOpen={isOpen} />
    </div>
  )
}

export default HamburgerMenu
