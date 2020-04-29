import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Box, Heading } from "gestalt"

const Header = ({ siteTitle }) => (
  <header>
    <Box color="darkGray">
      <Heading align="left" accessibilityLevel={1}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`
          }}
        >
          {siteTitle}
        </Link>
      </Heading>
    </Box>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
