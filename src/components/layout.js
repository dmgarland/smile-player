import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Menu from "./menu"
import InstallBanner from "./install-banner"
import { Box, Text, Link } from "gestalt"
import "./layout.css"
import "gestalt/dist/gestalt.css"
import Update from "./update"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          donationUrl
          homepageUrl
        }
      }
    }
  `)

  return (
    <div id="page-container">
      <div id="content-wrap">
        <Header siteTitle={data.site.siteMetadata.title} />
        <Menu donationUrl={data.site.siteMetadata.donationUrl} />
        <main>
          <InstallBanner />
          <Box paddingX={3}>{children}</Box>
        </main>
      </div>
      <footer>
        <Box padding={6} color="darkWash">
          <Text color="gray" align="center">
            Brought to you by{" "}
            <Link href={data.site.siteMetadata.homepageUrl} inline>
              Shapeshifter Productions
            </Link>
          </Text>
        </Box>
      </footer>
      <Update />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
