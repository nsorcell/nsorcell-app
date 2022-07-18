import { cache } from "@emotion/css"
import { CacheProvider } from "@emotion/react"
import Layout from "components/layout"
import { appWithTranslation } from "next-i18next"
import type { AppProps } from "next/app"
import { Provider as Store } from "react-redux"
import GlobalStyles from "styles/GlobalStyles"

import Web3Provider from "components/provider"
import { ToastContainer } from "react-toastify"
import { store } from "store"
import "styles/globals.css"

import Boostrap from "components/boostrap"
import { ToastContainerSettings } from "config/toast-settings"
import { FC, ReactNode } from "react"

const ActiveApp: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Boostrap />
      <Layout>{children}</Layout>
    </>
  )
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CacheProvider value={cache}>
      <Web3Provider>
        <Store store={store}>
          <ActiveApp>
            <Component {...pageProps} />
          </ActiveApp>
        </Store>
        <ToastContainer {...ToastContainerSettings} />
      </Web3Provider>
    </CacheProvider>
  )
}

export default appWithTranslation(App)
