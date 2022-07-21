import Heading from "components/heading"
import Lottery from "components/lottery"
import type { NextPage } from "next"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { wrapper } from "store"
import { addressesReceived } from "store/features/address/actions"
import { switchChain } from "store/features/web3/actions"
import "twin.macro"
import { AddressState } from "types/store"
import { getDefaultChain, getSupportedChains } from "utils/rpc"

import { getServerSideTranslations } from "utils/translations"

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ locale }) => {
      const supportedChains = await getSupportedChains()
      const addresses: AddressState = { lottery6: supportedChains }
      const defaultChaiId = getDefaultChain(addresses)

      store.dispatch(addressesReceived(addresses))
      store.dispatch(switchChain(defaultChaiId))

      return {
        props: {
          ...(await getServerSideTranslations(locale!)),
        },
      }
    }
)

export default Home
