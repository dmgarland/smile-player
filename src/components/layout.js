import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import InstallBanner from "./install-banner"
import { Box, Container, Text } from "gestalt"
import "./layout.css"
import "gestalt/dist/gestalt.css"
import Update from "./update"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Container>
      <Header siteTitle={data.site.siteMetadata.title} />
      <InstallBanner />
      <main>
        <Box padding={6}>{children}</Box>
      </main>
      <footer>
        <Box padding={3}>
          <Text>
            Brought to you by{" "}
            <a href="http://www.shapeshifter-productions.com">
              Shapeshifter Productions Ltd.
            </a>
          </Text>
        </Box>
      </footer>
      <Update />
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
