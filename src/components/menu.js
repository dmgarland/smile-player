import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import {
  Box,
  IconButton,
  Layer,
  Flyout,
  Text,
  Button,
  Container
} from "gestalt"

const Menu = ({ donationUrl }) => {
  const [donateVisible, setDonateVisible] = useState(false)
  const anchorRef = React.useRef()

  return (
    <Box color="darkWash">
      <Container>
        <Box display="flex" justifyContent="between" alignItems="center">
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
                      <a href={donationUrl}>
                        <Button color="blue" text="Donate via PayPal" />
                      </a>
                    </Box>
                  </Box>
                </Flyout>
              </Layer>
            )}
          </Box>

          <Box paddingX={3}>
            <Link to="/about-smiling-sessions">
              <Text inline color="darkGray">
                About
              </Text>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

Menu.propTypes = {
  donationUrl: PropTypes.string
}
export default Menu
