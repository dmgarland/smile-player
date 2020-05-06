import React, { useState } from "react"
import { Box, IconButton } from "gestalt"

const Banner = ({ children }) => {
  const [visible, setVisible] = useState(true)

  return (
    visible && (
      <Box
        alignItems="center"
        display="flex"
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
  )
}

export default Banner
