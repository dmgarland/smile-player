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
  Container,
  Image,
} from "gestalt"
import logo from "../images/sunshine-fading.svg"

const Header = ({ siteTitle }) => {
  const [donateVisible, setDonateVisible] = useState(false)
  const anchorRef = React.useRef()

  return (
    <>
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

      <Box color="darkWash">
        <Container>
          <Box display="inlineBlock" ref={anchorRef}>
            <IconButton
              accessibilityLabel="Love Us? Donate!"
              size="lg"
              icon="heart"
              iconColor="red"
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
        </Container>
      </Box>
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
