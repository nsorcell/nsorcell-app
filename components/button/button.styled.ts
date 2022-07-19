import tw, { styled } from "twin.macro"

export const StyledButton = styled.button<{
  iconPosition?: "left" | "right"
  disabled: boolean
  isLoading: boolean
}>(({ iconPosition, disabled, isLoading }) => [
  tw`relative justify-center items-center w-full py-3 px-6 min-width[150px] min-height[45px]`,
  tw`rounded-[16px] text-white cursor-pointer`,
  tw`transition-all duration-300`,
  tw`md:w-auto md:min-width[180px]`,
  disabled
    ? tw`bg-gray-400/80 text-opacity-50 cursor-not-allowed`
    : [tw`bg-indigo-500`, tw`hover:bg-indigo-400 active:bg-indigo-700`],
  isLoading ? tw`cursor-wait` : "",
  iconPosition === "left" ? tw`flex flex-row-reverse` : tw`flex`,
])

export const IconContainer = styled.span<{ iconPosition: "left" | "right" }>(
  ({ iconPosition }) => (iconPosition === "left" ? tw`mr-2` : tw`ml-2`)
)
