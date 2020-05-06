import React from "react"
import Banner from "./banner"
import { Sticky, Text, Button, Box } from "gestalt"

const InstallBanner = () => (
  <Sticky top={0}>
    <Banner>
      <Box marginRight={6} flex="grow">
        <Text color="white">Enjoy your songs offline using our free app!</Text>
      </Box>
      <Box paddingX={3}>
        <Button text="Install" inline />
      </Box>
    </Banner>
  </Sticky>
)

export default InstallBanner
