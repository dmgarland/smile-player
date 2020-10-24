import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Box, Button, Heading, Container, Column, Text } from "gestalt"
import logo from "../images/sunshine-fading.svg"
import useCurrentSession from "../hooks/use-current-session"

const Header = ({ siteTitle, donationUrl, setShowAuth }) => {
  const { session } = useCurrentSession()
  const welcome = session ? (
    <Text>Welcome {session && session.name}</Text>
  ) : (
    <Button onClick={() => setShowAuth(true)} size="sm" text="Sign in" />
  )

  return (
    <header>
      <Container>
        <Box
          display="flex"
          direction="row"
          justifyContent="between"
          alignItems="center"
        >
          <Link to="/">
            <img className="logo" src={logo} />
          </Link>

          <Link to="/">
            <Heading align="center" accessibilityLevel={1} size="md">
              {siteTitle}
            </Heading>
          </Link>

          <div>{welcome}</div>
        </Box>
      </Container>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
