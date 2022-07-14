import tw, { styled } from "twin.macro"
import { NthChild, Size } from "./loader"

export const Wrapper = styled.div<{ size: Size }>(({ size }) => [
  size === "sm" ? tw`zoom[0.25]` : "",
  size === "md" ? tw`zoom[0.5]` : "",
  tw`absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]`,
  tw`w-[200px] h-[60px]`,
])

export const Circle = styled.div<{ nth: NthChild }>(({ nth }) => [
  tw`left-[15%] w-5 h-5`,
  tw`absolute left-[15%] rounded-full bg-white transform-origin[50%] animate-circle`,
  nth === 1 && tw`left-[45%] animation-delay[200ms]`,
  nth === 2 && tw`left-auto right-[15%] animation-delay[300ms]`,
])

export const Shadow = styled.div<{ nth: NthChild }>(({ nth }) => [
  tw`top-[62px] left-[15%] w-5 h-1`,
  tw`absolute rounded-full bg-black opacity-50 z-0 blur-sm animate-shadow`,
  nth === 1 && tw`left-[45%] animation-delay[200ms]`,
  nth === 2 && tw`left-auto right-[15%] animation-delay[300ms]`,
])
