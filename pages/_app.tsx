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

const App = ({ Component, pageProps }: AppProps) => (
  <CacheProvider value={cache}>
    <Store store={store}>
      <Web3Provider>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />{" "}
        </Layout>
      </Web3Provider>
    </Store>
  </CacheProvider>
)

export default appWithTranslation(App)
