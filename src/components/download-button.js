import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import { Box, Text, Button, Icon } from "gestalt"
import useCache from "../hooks/cache"
import download from "../lib/download"
import VideoContext from "../context/video-context"

const DownloadButton = ({ public_id }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [label, setLabel] = useState("Preparing...")
  const [progress, setProgress] = useState(0)
  const cached = useCache()
  const { baseUrl, videoExtension } = useContext(VideoContext)
  const encodedPublicId = public_id
    .split("/")
    .map(p => encodeURIComponent(p))
    .join("/")
  const url = `${baseUrl}/${encodedPublicId}.${videoExtension}`
  const is_cached = cached.find(result => result.match(encodedPublicId))

  const onUpdate = progress => {
    setProgress(progress)
    setLabel("Downloading")
  }

  const onClick = () => {
    setIsDownloading(true)
    download({ url, onUpdate })
  }

  const button = (
    <Button
      text="Save for Later"
      onClick={onClick}
      iconEnd="download"
      inline
      color="blue"
    />
  )

  const saved = (
    <>
      <Box display="inlineBlock" marginRight={3}>
        <Text color="white" inline>
          Saved
        </Text>
      </Box>

      <Icon
        icon="check"
        inline
        color="green"
        accessibilityLabel="Saved for Later"
      />
    </>
  )

  const progressBar = (
    <Box>
      <Text align="center" color="white">
        {label}
      </Text>
      <progress value={progress} />
    </Box>
  )

  return is_cached || progress == 1
    ? saved
    : isDownloading
    ? progressBar
    : button
}

export default DownloadButton

DownloadButton.propTypes = {
  public_id: PropTypes.string.isRequired
}
