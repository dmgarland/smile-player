import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Box, Heading, Image } from "gestalt"
import sunshine from "../images/sunshine.svg"

const Header = ({ siteTitle }) => (
  <header>
    <Link
      to="/"
      style={{
        textDecoration: `none`,
        display: "block"
      }}
    >
      <Box paddingY={6} display="flex" alignItems="center">
        <img src={sunshine} id="logo" alt="Smiling Remotely" />
        <Heading align="center" accessibilityLevel={1}>
          {siteTitle}
        </Heading>
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
