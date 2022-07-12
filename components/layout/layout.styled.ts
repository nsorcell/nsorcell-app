import tw, { styled } from "twin.macro"

export const Content = styled.main(() => [
  tw`flex flex-1 justify-center p-2 pt-4 pb-[300px]`,
  tw`md:pt-40 md:pb-[188px]`,
])

export const LayoutContainer = tw.div`min-h-screen flex-col relative pb-40`

export const MainContainer = tw.div`flex-1 flex flex-col sm:flex-row`
