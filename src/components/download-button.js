import React, { useState } from "react"
import PropTypes from "prop-types"
import { Box, Text, Button } from "gestalt"
import download from "../lib/download"

const DownloadButton = ({ url }) => {
  const [label, setLabel] = useState("Preparing...")
  const [progress, setProgress] = useState(0)
  const onUpdate = progress => {
    setProgress(progress)
    setLabel(progress < 1 ? "Downloading" : "Done")
  }

  const button = (
    <Button
      text="Download"
      onClick={() => download({ url, onUpdate })}
      iconEnd="download"
    />
  )

  const progressBar = (
    <Box>
      <Text align="center">{label}</Text>
      <progress value={progress} />
    </Box>
  )

  return progress > 0 ? progressBar : button
}

export default DownloadButton

DownloadButton.propTypes = {
  url: PropTypes.string,
  is_cached: PropTypes.bool
}
