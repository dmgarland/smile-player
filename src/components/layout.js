import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Menu from "./menu"
import { Box, Text, Icon, Modal, Layer, IconButton } from "gestalt"
import "./layout.css"
import "gestalt/dist/gestalt.css"
import Update from "./update"
import { OutboundLink } from "gatsby-plugin-gtag"
import AuthRequired from "./auth-required"
import useCurrentSession from "../hooks/use-current-session"

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

  const { session, showAuth, setShowAuth } = useCurrentSession()

  return (
    <>
      {!session && showAuth && (
        <Layer zIndex={{ index: () => 2 }}>
          <Modal
            accessibilityModalLabel="Login Modal"
            size="md"
            onDismiss={() => setShowAuth(false)}
          >
            <div style={{ position: "absolute", right: "6px", top: "6px" }}>
              <IconButton
                accessibilityLabel="Close"
                icon="cancel"
                onClick={() => setShowAuth(false)}
              />
            </div>
            <Box padding={6}>
              <AuthRequired component={Box} />
            </Box>
          </Modal>
        </Layer>
      )}
      <div id="page-container">
        <div id="content-wrap">
          <Header
            siteTitle={data.site.siteMetadata.title}
            donationUrl={data.site.siteMetadata.donationUrl}
            setShowAuth={setShowAuth}
          />

          <Menu donationUrl={data.site.siteMetadata.donationUrl} />
          <main>
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
                <Icon
                  icon="twitter"
                  accessibilityLabel="Follow us on Twitter"
                />
              </OutboundLink>
              <OutboundLink href="https://www.facebook.com/shapeshifterproductions/">
                <Icon
                  icon="facebook"
                  accessibilityLabel="Follow us on Facebook"
                />
              </OutboundLink>
              <OutboundLink href="https://www.instagram.com/shapeshifter_productions/">
                <Icon
                  icon="camera"
                  accessibilityLabel="Follow us on Instagram"
                />
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
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
