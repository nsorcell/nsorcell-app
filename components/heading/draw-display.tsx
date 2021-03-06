import Loader, { Ellipsis } from "components/loader"
import { GradientText, Text } from "components/typography"
import formatDistance from "date-fns/formatDistance"
import { useAppSelector } from "hooks/store"
import { TFunction, useTranslation } from "next-i18next"
import { FC, ReactNode, useEffect, useMemo } from "react"
import "twin.macro"
import { LotteryState } from "types/store"
import { useCountdown } from "usehooks-ts"

const colorMap: Record<LotteryState | "INITIAL", string> = {
  INITIAL: "text-yellow-400",
  STANDBY: "text-red-400",
  CALCULATING: "text-blue-400",
  DRAWING: "text-blue-400",
  OPEN: "text-green-400",
}

type MapStateArgs = {
  drawIn: string
}

const mapState: Record<
  LotteryState | "INITIAL",
  (t: TFunction, args: MapStateArgs) => ReactNode
> = {
  INITIAL: () => (
    <div tw="relative w-20 h-8">
      <Loader size="md" />
    </div>
  ),
  STANDBY: (t) => (
    <Text variant="h5">
      Waiting for players to <GradientText>enter...</GradientText>
    </Text>
  ),
  CALCULATING: () => (
    <Text variant="h5">
      Figuring things out...
      <Ellipsis />
    </Text>
  ),
  DRAWING: () => <Text variant="h5">Picking the winning numbers...</Text>,
  OPEN: (t, args) => (
    <Text variant="h5">
      Draw in: <GradientText>{args.drawIn}</GradientText>
    </Text>
  ),
}

const DrawDisplay: FC = () => {
  const { state, drawInterval, lastDraw } = useAppSelector(
    (state) => state.lottery
  )
  const { t } = useTranslation("heading")

  const [number, countDown] = useCountdown({
    countStart: Math.floor(drawInterval - (Date.now() / 1000 - lastDraw)),
    countStop: 0,
  })

  useEffect(() => {
    if (lastDraw && drawInterval) {
      countDown.resetCountdown()
      countDown.startCountdown()
    }
  }, [lastDraw, drawInterval])

  const drawIn = useMemo(
    () => formatDistance(Date.now() + number * 1000, Date.now()),
    [number]
  )

  return (
    <Text variant="h5" tw="text-gray-400 mt-6 text-left">
      {t("lotteryState")}
      <span className={colorMap[state]} tw="inline-flex mb-2">
        {state}
      </span>
      <div tw="flex items-center gap-1">
        <span tw="hidden md:visible">|</span>
        {mapState[state](t, { drawIn })}
      </div>
    </Text>
  )
}

export default DrawDisplay
