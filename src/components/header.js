import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Box, Heading } from "gestalt"
import sunshine from "../images/sunshine.svg"

const Header = ({ siteTitle }) => (
  <header>
    <Link
      to="/"
      style={{
        textDecoration: `none`
      }}
    >
      <Box
        alignItems="center"
        direction="row"
        display="flex"
        borderSize="sm"
        bottom
      >
        <Box marginRight={3}>
          <img src={sunshine} alt="Smiling Remotely" id="logo" />
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
