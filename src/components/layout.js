import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "typeface-raleway"
import Header from "./header"
import InstallBanner from "./install-banner"
import { Box, Container, Text, Sticky, Button } from "gestalt"
import "./layout.css"
import "gestalt/dist/gestalt.css"

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
      <Box color="white" padding={6}>
        <main>{children}</main>
      </Box>
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
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
