import { extractCritical } from "@emotion/server"
import Document, { Head, Html, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/images/icons/nsorcell.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx)
  const critical = extractCritical(initialProps.html)
  initialProps.html = critical.html
  initialProps.styles = (
    <>
      {initialProps.styles}
      <style
        data-emotion-css={critical.ids.join(" ")}
        dangerouslySetInnerHTML={{ __html: critical.css }}
      />
    </>
  )

  return initialProps
}
