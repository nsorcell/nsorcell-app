import useIsConnected from "hooks/useIsConnected"
import type { NextPage } from "next"
import Head from "next/head"
import "twin.macro"

import { getServerSideTranslations } from "utils/translations"

export const getStaticProps = async ({ locale }: { locale: Locale }) => {
  return {
    props: {
      ...(await getServerSideTranslations(locale)),
    },
  }
}

const Home: NextPage = () => {
  const isConnected = useIsConnected()

  return (
    <>
      <Head>
        <title>Nsorcell Blockchain Lottery</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div tw="flex flex-col md:flex-row items-center md:items-start justify-between">
        Devlog
      </div>
    </>
  )
}

export default Home
