import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"

import {
  Box,
  IconButton,
  Layer,
  Flyout,
  Text,
  Container,
  Sticky,
  Divider,
  Icon,
} from "gestalt"

const Menu = ({ donationUrl }) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const anchorRef = React.useRef()

  return (
    <Sticky top={0}>
      <Box color="darkWash" position="relative">
        <Container>
          <Box display="flex" justifyContent="between" alignItems="center">
            <Box display="inlineBlock" ref={anchorRef} marginLeft={2}>
              <IconButton
                accessibilityLabel="Navigation Menu"
                size="lg"
                icon="menu"
                accessibilityExpanded={!!menuVisible}
                accessibilityHaspopup
                text="Menu"
                onClick={() => {
                  const action = menuVisible ? "Close" : "Open"
                  setMenuVisible(!menuVisible)
                  // trackCustomEvent({
                  //   category: `Heart Button`,
                  //   label: `${action} Donation Flyout`,
                  //   action: "Click"
                  // })
                  if (window.gtag) {
                    window.gtag("event", "Click", {
                      event_category: "Heart Button",
                      event_label: `${action} Donation Flyout`,
                    })
                  }
                }}
              />
              {menuVisible && (
                <Flyout
                  anchor={anchorRef.current}
                  idealDirection="down"
                  onDismiss={() => setMenuVisible(false)}
                  positionRelativeToAnchor={true}
                  size="md"
                  id="main-menu"
                >
                  <Box display="flex" direction="column" column={12}>
                    <Link to="/" className="menu-item">
                      <Text color="darkGray" align="center">
                        Series 2
                      </Text>
                    </Link>
                    <Divider />
                    <Link to="/series-1" className="menu-item">
                      <Text color="darkGray" align="center">
                        Series 1
                      </Text>
                    </Link>
                    <Divider />
                    <Link to="/about-smiling-sessions" className="menu-item">
                      <Text color="darkGray" align="center">
                        About Us
                      </Text>
                    </Link>
                    <Divider />
                    <a
                      href="https://www.paypal.me/shapeshifterprod"
                      className="menu-item"
                    >
                      <Text color="darkGray" align="center">
                        Support Us <Icon icon="heart" inline />
                      </Text>
                    </a>
                  </Box>
                </Flyout>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </Sticky>
  )
}

Menu.propTypes = {
  donationUrl: PropTypes.string,
}
export default Menu
