import { cache } from "@emotion/css"
import { CacheProvider } from "@emotion/react"
import Layout from "components/layout"
import { appWithTranslation } from "next-i18next"
import type { AppProps } from "next/app"
import { Provider as Store } from "react-redux"
import GlobalStyles from "styles/GlobalStyles"

import Web3Provider from "components/provider"
import { store } from "store"
import "styles/globals.css"

import DataLoader from "components/data-loader"
import Head from "next/head"
import { getServerSideTranslations } from "utils/translations"

export const getServerSideProps = async ({ locale }: { locale: Locale }) => {
  return {
    props: {
      ...(await getServerSideTranslations(locale)),
    },
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CacheProvider value={cache}>
      <Web3Provider>
        <Store store={store}>
          <Head>
            <meta name="viewport" content="viewport-fit=cover" />
          </Head>
          <GlobalStyles />
          <DataLoader />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Store>
      </Web3Provider>
    </CacheProvider>
  )
}

export default appWithTranslation(App)
