import tw, { styled } from "twin.macro"

export const MobileMenuDropdown = styled.div<{ isOpen: boolean }>(
  ({ isOpen }) => [
    tw`fixed w-full h-0 left-0 top-[100px] z-40 flex flex-col`,
    tw`transition-all duration-500 bg-gray-background overflow-hidden`,
    tw`md:hidden`,
    isOpen && tw`h-[calc(100vh - 100px)] px-8`,
  ]
)
