import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import InstallBanner from "./install-banner"
import { Box, Container, Text, Link } from "gestalt"
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
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Container>
        <main>
          <InstallBanner />
          <Box paddingX={6}>{children}</Box>
        </main>
        <Box color="darkWash" position="absolute" bottom left width="100%">
          <footer>
            <Box padding={3} marginLeft="auto" marginRight="auto">
              <Text color="gray" align="center">
                Brought to you by{" "}
                <Link href="http://www.shapeshifter-productions.com" inline>
                  Shapeshifter Productions Ltd.
                </Link>
              </Text>
            </Box>
          </footer>
        </Box>
        <Update />
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
