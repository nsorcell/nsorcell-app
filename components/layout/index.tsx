import Footer from "components/navigation/footer"
import Header from "components/navigation/header"
import { FC, ReactNode } from "react"
import Content from "./content"
import { LayoutContainer, MainContainer } from "./layout.styled"

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <MainContainer>
        <Content>{children}</Content>
      </MainContainer>
      <Footer />
    </LayoutContainer>
  )
}

export default Layout
