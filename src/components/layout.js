import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Menu from "./menu"
import InstallBanner from "./install-banner"
import { Box, Text, Icon } from "gestalt"
import "./layout.css"
import "gestalt/dist/gestalt.css"
import Update from "./update"
import { OutboundLink } from "gatsby-plugin-gtag"

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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="between"
            marginBottom={12}
            width="50%"
            marginLeft="auto"
            marginRight="auto"
          >
            <OutboundLink href="https://twitter.com/ShapeshifterE17">
              <Icon icon="twitter" accessibilityLabel="Follow us on Twitter" />
            </OutboundLink>
            <OutboundLink href="https://www.facebook.com/shapeshifterproductions/">
              <Icon
                icon="facebook"
                accessibilityLabel="Follow us on Facebook"
              />
            </OutboundLink>
            <OutboundLink href="https://www.instagram.com/shapeshifter_productions/">
              <Icon icon="camera" accessibilityLabel="Follow us on Instagram" />
            </OutboundLink>
          </Box>

          <Text color="gray" align="center">
            Brought to you by{" "}
            <OutboundLink href={data.site.siteMetadata.homepageUrl}>
              <Text color="gray" inline>
                Shapeshifter Productions
              </Text>
            </OutboundLink>
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
