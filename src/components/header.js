import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import {
  Box,
  Heading,
  IconButton,
  Layer,
  Flyout,
  Text,
  Button,
  Container
} from "gestalt"
import logo from "../images/sunshine-fading.svg"

const Header = ({ siteTitle }) => {
  const [donateVisible, setDonateVisible] = useState(false)
  const anchorRef = React.useRef()

  return (
    <header>
      <Container>
        <Box display="flex" justifyContent="between" alignItems="center">
          <img alt={siteTitle} height={48} width={48} src={logo} />

          <Link
            to="/"
            style={{
              textDecoration: `none`
            }}
          >
            <Heading align="center" accessibilityLevel={1} size="sm">
              {siteTitle}
            </Heading>
          </Link>

          <Box paddingX="2">
            <Box display="inlineBlock" ref={anchorRef}>
              <IconButton
                accessibilityLabel="Love Us? Donate!"
                icon="heart"
                iconColor="red"
                size="lg"
                accessibilityExpanded={!!donateVisible}
                accessibilityHaspopup
                onClick={() => {
                  setDonateVisible(!donateVisible)
                }}
              />
              {donateVisible && (
                <Layer>
                  <Flyout
                    anchor={anchorRef.current}
                    idealDirection="down"
                    onDismiss={() => setDonateVisible(false)}
                    positionRelativeToAnchor={true}
                    size="md"
                  >
                    <Box
                      padding={3}
                      display="flex"
                      alignItems="center"
                      direction="column"
                      column={12}
                    >
                      <Text align="center" weight="bold">
                        Enjoying our videos? Please donate to help support us to
                        bring new songs to more care homes near you.
                      </Text>
                      <Box paddingX={2} marginTop={3}>
                        <a href="https://www.paypal.me/shapeshifterprod">
                          <Button color="blue" text="Donate via PayPal" />
                        </a>
                      </Box>
                    </Box>
                  </Flyout>
                </Layer>
              )}
            </Box>
          </Box>
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
