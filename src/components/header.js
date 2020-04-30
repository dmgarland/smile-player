import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "./image"
import { Box, Heading } from "gestalt"

const Header = ({ siteTitle }) => (
  <header style={{ background: "#ffff00" }}>
    <Link
      to="/"
      style={{
        textDecoration: `none`
      }}
    >
      <Box
        alignItems="start"
        direction="row"
        display="flex"
        height="60"
        borderSize="sm"
        bottom
      >
        <Box paddingX={1}>
          <Image path="sunshine.jpg" />
        </Box>
        <Box>
          <Heading align="center" accessibilityLevel={1} color="orange">
            {siteTitle}
          </Heading>
        </Box>
      </Box>
    </Link>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
