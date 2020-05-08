import React, { useState } from "react"
import PropTypes from "prop-types"
import { Box, Text, Button } from "gestalt"
import download from "../lib/download"

const DownloadButton = ({ url }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [label, setLabel] = useState("Preparing...")
  const [progress, setProgress] = useState(0)
  const onUpdate = progress => {
    setProgress(progress)
    setLabel(progress < 1 ? "Downloading" : "Done")
  }

  const onClick = () => {
    setIsDownloading(true)
    download({ url, onUpdate })
  }

  const button = (
    <Button text="Download" onClick={onClick} iconEnd="download" inline />
  )

  const progressBar = (
    <Box>
      <Text align="center">{label}</Text>
      <progress value={progress} />
    </Box>
  )

  return isDownloading ? progressBar : button
}

export default DownloadButton

DownloadButton.propTypes = {
  url: PropTypes.string,
  is_cached: PropTypes.bool
}
