import { cache } from "@emotion/css"
import { CacheProvider } from "@emotion/react"
import Layout from "components/layout"
import { appWithTranslation } from "next-i18next"
import type { AppProps } from "next/app"
import GlobalStyles from "styles/GlobalStyles"

import Web3Provider from "components/provider"
import { ToastContainer } from "react-toastify"
import "styles/globals.css"

import Bootstrap from "components/bootstrap"
import { ToastContainerSettings } from "config/toast-settings"
import { wrapper } from "store"

const App = wrapper.withRedux(
  appWithTranslation(({ Component, pageProps }: AppProps) => {
    return (
      <CacheProvider value={cache}>
        <Web3Provider>
          <GlobalStyles />
          <Bootstrap />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer {...ToastContainerSettings} />
        </Web3Provider>
      </CacheProvider>
    )
  })
)

export default App
