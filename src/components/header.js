import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import {
  Box,
  Heading,
  Container,
  Image,
} from "gestalt"
import logo from "../images/sunshine-fading.svg"

const Header = ({ siteTitle }) => {
  return (
      <header>
        <Container>
          <Link
            to="/"
            style={{
              textDecoration: `none`,
            }}
          >
            <Image
              alt={siteTitle}
              naturalHeight={80}
              naturalWidth={80}
              src={logo}
              fit="contain"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                direction="column"
                wrap={true}
                column={6}
                marginLeft="auto"
                marginRight="auto"
              >
                <Heading align="center" accessibilityLevel={1} size="md">
                  {siteTitle}
                </Heading>
              </Box>
            </Image>
          </Link>
        </Container>
      </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
