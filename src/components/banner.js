import React from "react"
import { Box, IconButton } from "gestalt"

const Banner = ({ setVisible, children }) => (
  <Box
    alignItems="center"
    display="flex"
    direction="row"
    height={60}
    color="blue"
    rounding="pill"
    paddingY={3}
    margin={1}
  >
    <Box paddingX={1}>
      <IconButton
        icon="clear"
        iconColor="white"
        onClick={() => setVisible(false)}
        size="xl"
      />
    </Box>
    {children}
  </Box>
)

export default Banner
