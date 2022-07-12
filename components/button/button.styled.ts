import tw, { styled } from "twin.macro"

export const StyledButton = styled.button<{
  iconPosition?: "left" | "right"
  disabled: boolean
}>(({ iconPosition, disabled }) => [
  tw`items-center w-full py-3 px-6`,
  tw`rounded-[16px] text-white cursor-pointer`,
  tw`md:w-auto`,
  disabled
    ? tw`bg-gray-400/80 text-opacity-50 cursor-not-allowed`
    : [tw`bg-indigo-500`, tw`hover:bg-indigo-400 active:bg-indigo-700`],
  iconPosition === "left" ? tw`flex flex-row-reverse` : tw`flex`,
])

export const IconContainer = styled.span<{ iconPosition: "left" | "right" }>(
  ({ iconPosition }) => (iconPosition === "left" ? tw`mr-2` : tw`ml-2`)
)
