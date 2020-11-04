import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import useCurrentSession from "../hooks/use-current-session"

import {
  Box,
  IconButton,
  Button,
  Flyout,
  Text,
  Container,
  Sticky,
  Divider,
  Icon
} from "gestalt"

const Menu = ({ donationUrl }) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const { session, signOut } = useCurrentSession()
  const anchorRef = React.useRef()

  const signOutLink = (
    <>
      <Divider />
      <div
        className="menu-item"
        onClick={async () => {
          await signOut()
          setMenuVisible(false)
          navigate("/")
        }}
      >
        <Text color="darkGray" align="center">
          Sign out{" "}
          <Icon
            icon="logout"
            accessibilityLabel="Logout Icon"
            inline
            color="darkGray"
          />
        </Text>
      </div>
    </>
  )

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
                      event_label: `${action} Donation Flyout`
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
                    <Link to="/privacy" className="menu-item">
                      <Text color="darkGray" align="center">
                        Privacy Policy
                      </Text>
                    </Link>

                    <Divider />
                    <Link to="/about-smiling-sessions" className="menu-item">
                      <Text color="darkGray" align="center">
                        About Us
                      </Text>
                    </Link>

                    {session && signOutLink}
                  </Box>
                </Flyout>
              )}
            </Box>
            <Button
              color="blue"
              text="Support Us"
              iconEnd="heart"
              inline
              href={donationUrl}
              role="link"
            />
          </Box>
        </Container>
      </Box>
    </Sticky>
  )
}

Menu.propTypes = {
  donationUrl: PropTypes.string
}
export default Menu
