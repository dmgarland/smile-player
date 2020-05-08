import React, { useState } from "react"
import PropTypes from "prop-types"
import { Button } from "gestalt"
import download from "../lib/download"

const label = ({ is_cached, progress }) => {
  if (is_cached) {
    return "Saved"
  } else if (progress > 0) {
    return "Downloading"
  } else {
    return "Download"
  }
}

const DownloadButton = ({ url, is_cached }) => {
  const [progress, setProgress] = useState(0)
  const progressBar = progress ? <progress value={progress} /> : null

  return (
    <>
      <Button
        text={label({ is_cached, progress })}
        onClick={() => download({ url, setProgress })}
        disabled={progress > 0}
        iconEnd="download"
      />
      {progressBar}
    </>
  )
}

export default DownloadButton

DownloadButton.propTypes = {
  url: PropTypes.string,
  is_cached: PropTypes.bool
}
