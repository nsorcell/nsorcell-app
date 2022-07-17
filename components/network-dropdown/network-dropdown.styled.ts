import tw, { styled } from "twin.macro"

export const DropdownContainer = styled.div<{ isOpen: boolean }>(
  ({ isOpen }) => [
    tw`opacity-0 shadow-2xl invisible transition-all duration-300 transform origin-top-right -translate-y-2 scale-95`,
    isOpen && tw`visible opacity-100 translate[0] scale-100`,
  ]
)

export const MenuItem = styled.a(() => [
  tw`flex justify-between w-full px-4 py-2 `,
  tw`text-white cursor-pointer`,
  tw`hover:bg-gray-700 active:bg-gray-700`,
])

export const DropdownButton = styled.button(() => [
  tw`inline-flex justify-center items-center w-full px-1 py-3  bg-transparent rounded-md`,
  tw`transition-all duration-150 ease-in-out`,
  tw`hover:text-gray-500 focus:outline-none focus:border-blue-300 active:bg-gray-700 active:text-gray-800`,
])

export const DropdownPanel = styled.div(() => [
  tw`absolute right-0 w-56 mt-2 origin-top-right`,
  tw`bg-panel divide-y divide-gray-800 rounded-md shadow-lg outline-none`,
])
