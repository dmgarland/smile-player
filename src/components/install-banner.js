import React, { useEffect, useState } from "react"
import Banner from "./banner"
import { Container, Text, Button, Box } from "gestalt"
// import { trackCustomEvent } from "gatsby-plugin-gtag"

const InstallBanner = () => {
  const [installEvent, setInstallEvent] = useState(null)
  const [visible, setVisible] = useState(true)

  const saveInstallEvent = e => {
    e.preventDefault()
    setInstallEvent(e)
    setVisible(true)
  }

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", saveInstallEvent)
    return () =>
      window.removeEventListener("beforeinstallprompt", saveInstallEvent)
  }, [])

  return (
    visible && (
      <div id="install-banner">
        <Container>
          <Banner setVisible={setVisible}>
            <Box marginRight={6} flex="grow">
              <Text color="white">
                Enjoy your songs offline using our free app!
              </Text>
            </Box>
            <Box paddingX={3}>
              <Button
                text="Install"
                inline
                onClick={e => {
                  installEvent.prompt()
                  installEvent.userChoice.then(choice => {
                    if (choice.outcome === "accepted") {
                      // trackCustomEvent({
                      //     category: `Install Button`,
                      //     label: `Installed`,
                      //     action: "Click"
                      // })

                      if (window.gtag) {
                        window.gtag("event", "Installed", {
                          event_category: "Install Button"
                        })
                      }
                    } else {
                      // trackCustomEvent({
                      //     category: `Install Button`,
                      //     label: `Declined Installation`,
                      //     action: "Click"
                      // })

                      if (window.gtag) {
                        window.gtag("event", "Installed", {
                          event_category: "Install Button"
                        })
                      }
                    }
                  })
                }}
              />
            </Box>
          </Banner>
        </Container>
      </div>
    )
  )
}

export default InstallBanner
