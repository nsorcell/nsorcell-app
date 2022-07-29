import { BarChart } from "components/chart"
import { GradientText, Text } from "components/typography"
import { useAppSelector } from "hooks/store"
import type { NextPage } from "next"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useEffect, useState } from "react"

import "twin.macro"

import { getServerSideTranslations } from "utils/translations"

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await getServerSideTranslations(locale)),
    },
  }
}

const Home: NextPage = () => {
  const { t } = useTranslation("common")
  const [hits, setHits] = useState<number | null>(null)
  const [winningNums, setWinningNums] = useState<number[]>()

  const { account } = useAppSelector((state) => state.web3)
  const { numbers } = useAppSelector((state) => state.player)

  const { history, numberOfDraws } = useAppSelector((state) => state.lottery)

  useEffect(() => {
    if (history && account) {
      const { winningNumbers, results } = history[numberOfDraws - 1]

      setWinningNums(winningNumbers)

      const hits = results.indexOf(
        results.find((r) => r.includes(account)) ?? []
      )

      setHits(hits)
    }
  }, [history, account])
  return (
    <>
      <Head>
        <title>{t("results")}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div tw="w-2/3 flex flex-col items-center md:items-start justify-between">
        <Text variant="h1" tw="text-white mb-8">
          History
        </Text>
        <div tw="w-full">
          {winningNums && (
            <Text variant="h5" tw="flex justify-between text-white pr-80">
              Last round's winning numbers were:{" "}
              <GradientText>{winningNums.join(", ")}</GradientText>
            </Text>
          )}
          {numbers && (
            <Text variant="h5" tw="flex justify-between text-white pr-80">
              Your numbers are:{" "}
              <GradientText>{numbers?.join(", ")}</GradientText>
            </Text>
          )}
          <div tw="w-full h-[0.5px] bg-gray-700 my-4" />
          {hits !== null ? (
            <Text variant="h5" tw="text-white mt-4">
              You had
              <GradientText tw="font-bold text-4xl px-2">{hits}</GradientText>
              hits in the previous round.
            </Text>
          ) : (
            <Text variant="h5" tw="text-white mb-8">
              You didn't play in the last round.
            </Text>
          )}
          <br />

          <div tw="mt-12">
            <BarChart history={history} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
