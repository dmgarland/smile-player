import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "typeface-raleway"
import Header from "./header"
import { Box, Container, Text } from "gestalt"
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
    <div style={{ background: "#d0e8ff" }}>
      <Container>
        <Header siteTitle={data.site.siteMetadata.title} />
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
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
