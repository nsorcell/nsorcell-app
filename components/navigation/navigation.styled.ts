import tw, { styled } from "twin.macro"

export const FooterContainer = styled.footer(() => [
  tw`absolute bottom-0 flex justify-center items-center w-full h-auto z-50 p-8`,
  tw`bg-panel`,
  tw`md:h-[188px] md:justify-end md:px-24`,
])

export const HeaderContainer = styled.header(() => [
  tw`flex w-full h-24 justify-between`,
])
