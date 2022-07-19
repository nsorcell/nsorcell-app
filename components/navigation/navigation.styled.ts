import tw, { styled } from "twin.macro"

export const FooterContainer = styled.footer(() => [
  tw`absolute bottom-0 flex justify-center items-center w-full h-auto z-50 p-8`,
  tw`bg-panel`,
  tw`md:h-[188px] md:justify-end md:px-24`,
])

export const HeaderContainer = tw.header`w-full flex justify-between items-center py-4 px-4 md:py-8`
