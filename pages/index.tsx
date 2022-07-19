import Heading from "components/heading"
import Lottery from "components/lottery"
import type { NextPage } from "next"
import { useTranslation } from "next-i18next"
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
  const { t } = useTranslation("common")

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div tw="flex flex-col md:flex-row items-center md:items-start justify-between">
        <Heading />
        <Lottery choices={6} domainSize={45} />
      </div>
    </>
  )
}

export default Home
