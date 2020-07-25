import React, { useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import { Box, Text, Button, Icon } from "gestalt"
import useCache, { isCached } from "../hooks/cache"
import download from "../lib/download"
import VideoContext from "../context/video-context"
import { encodePublicId } from "../utils/public-id"

const DownloadButton = ({ public_id }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [label, setLabel] = useState("Preparing...")
  const [progress, setProgress] = useState(0)
  const cached = useCache()
  const { baseUrl, videoExtension } = useContext(VideoContext)
  const url = `${baseUrl}/${encodePublicId(public_id)}.${videoExtension}`
  const [showButton, setShowButton] = useState(true)

  useEffect(() => {
    isCached(public_id).then(result => setShowButton(!!result))
  }, [public_id])

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

  return showButton || progress == 1
    ? saved
    : isDownloading
    ? progressBar
    : button
}

export default DownloadButton

DownloadButton.propTypes = {
  public_id: PropTypes.string.isRequired
}
