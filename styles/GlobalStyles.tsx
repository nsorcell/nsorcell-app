import { Global } from "@emotion/react"
import "react-toastify/dist/ReactToastify.css"
import tw, { css, GlobalStyles as BaseStyles } from "twin.macro"

const customStyles = css({
  body: {
    ...tw`antialiased`,
  },
})

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
)

export default GlobalStyles
