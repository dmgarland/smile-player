import React, { useEffect, useState } from "react"
import Banner from "./banner"
import { Sticky, Text, Button, Box } from "gestalt"

const InstallBanner = () => {
  const [installEvent, setInstallEvent] = useState(null)
  const [visible, setVisible] = useState(false)

  const saveInstallEvent = e => {
    console.log("install event")
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
        <Sticky top={0}>
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
                      console.log("accepted")
                    } else {
                      console.log("rejected")
                    }
                  })
                }}
              />
            </Box>
          </Banner>
        </Sticky>
      </div>
    )
  )
}

export default InstallBanner
