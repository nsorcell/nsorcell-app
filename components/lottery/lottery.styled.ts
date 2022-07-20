import tw, { styled } from "twin.macro"

export const LotteryContainer = styled.div(() => [
  tw`max-w-sm p-10 mt-16 mb-40`,
  tw`bg-lottery-bg/40 backdrop-blur-md border-radius[24px] shadow-lg`,
  tw`md:mt-0 md:mb-0 md:max-w-full`,
])

export const NumberContainer = styled.div(() => [
  tw`grid grid-cols-5 place-items-center grid-gap[8px] w-full`,
  tw`md:grid-cols-9`,
])

export const Number = styled.div(() => [
  tw`flex justify-center items-center w-[45px] h-[45px] p-3 z-10`,
  tw`bg-gray-number rounded-full cursor-pointer text-white font-bold`,
])

export const NumberGradient = styled.div<{ selected: boolean }>(
  ({ selected }) => [
    tw`p-0.5 rounded-full`,
    selected
      ? tw`bg-gradient-to-b from-gradient-1 via-gradient-2 to-gradient-3 animate-wiggle`
      : tw`bg-gradient-to-b from-gray-number to-gray-number`,
  ]
)

export const SlotsContainer = styled.div(() => [
  tw`grid grid-cols-3 place-items-center grid-gap[12px] w-full`,
  tw`md:grid-cols-6`,
])

export const Slot = styled.div<{ filled?: boolean; index: number }>(
  ({ filled, index }) => [
    tw`flex justify-center items-center w-12 h-12`,
    tw` bg-gray-slot border-[0.5px] border-purple-slot rounded-full cursor-pointer`,
    filled
      ? tw`bg-gradient-to-b from-gradient-1 via-gradient-2 to-gradient-3 border-none`
      : tw``,
    [0, 3].includes(index) ? tw`ml-auto md:ml-0` : "",
    [2, 5].includes(index) ? tw`mr-auto md:mr-0` : "",
    tw`md:w-16 md:h-16`,
  ]
)

export const BottomActionsContainer = styled.div(() => [
  tw`flex justify-center items-center flex-wrap w-full mt-6`,
  tw`md:justify-between md:mt-10`,
])

export const InstructionPill = styled.div(() => [
  tw`w-full mb-4 py-3 px-5`,
  tw`border border-gray-slot rounded-[16px]`,
  tw`md:mb-0 md:w-auto`,
])
