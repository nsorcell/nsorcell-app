import Loader, { Ellipsis } from "components/loader"
import { GradientText, Text } from "components/typography"
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict"
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
      Waiting for players to{" "}
      <GradientText>
        enter
        <Ellipsis />
      </GradientText>
    </Text>
  ),
  CALCULATING: () => (
    <Text variant="h5">
      Figuring things out
      <Ellipsis />
    </Text>
  ),
  DRAWING: () => (
    <Text variant="h5">
      Picking the winning numbers
      <Ellipsis />
    </Text>
  ),
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
    () => formatDistanceToNowStrict(number * 1000),
    [number]
  )

  return (
    <Text variant="body1" tw=" text-gray-400 mt-6">
      {t("lotteryState")}
      <br />
      <div tw="flex items-center gap-1">
        <Text variant="h5" className={colorMap[state]}>
          {state}
        </Text>
        |{mapState[state](t, { drawIn })}
      </div>
    </Text>
  )
}

export default DrawDisplay
