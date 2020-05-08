import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Video, Transformation } from "cloudinary-react"
import { Heading, Button, Box, Text } from "gestalt"
import DownloadButton from "./download-button"
import useCache from "../hooks/cache"

const VideoContainer = ({ public_id, title, description, created_at }) => {
  const [downloadURL, setDownloadURL] = useState(null)
  const htmlVideoRef = React.createRef()
  const cached = useCache()

  useEffect(() => {
    if (htmlVideoRef.current && htmlVideoRef.current.currentSrc) {
      setDownloadURL(htmlVideoRef.current.currentSrc)
    }
  }, [htmlVideoRef])

  const is_cached = cached.find(result => result.match(new RegExp(public_id)))

  return (
    <>
      <Box marginTop={6} marginBottom={-1}>
        <Video
          crossOrigin="anonymous"
          cloudName="dymvtkv1m"
          publicId={public_id}
          innerRef={htmlVideoRef}
          preload="metadata"
          width="100%"
          secure="true"
        >
          <Transformation videoCodec="auto" />
        </Video>
      </Box>
      <Box
        alignItems="start"
        borderSize="sm"
        direction="row"
        display="flex"
        padding={3}
      >
        <Box marginTop={-1} paddingX={1} flex="grow">
          <Text color="gray" italic>
            {created_at}
          </Text>
          <Box marginTop={2}>
            <Heading accessibilityLevel={3} size="sm">
              {title}
            </Heading>
          </Box>
          <Box marginTop={2}>
            <Text>{description}</Text>
          </Box>
        </Box>
        <Box paddingX={1}>
          <DownloadButton url={downloadURL} is_cached={is_cached} />
          <Box paddingY={1} />
          <Link to={`/${public_id}`}>
            <Button
              text="Play"
              iconEnd="play"
              inline
              type="submit"
              accessibilityLabel="Play"
            />
          </Link>
        </Box>
      </Box>
    </>
  )
}

export default VideoContainer

VideoContainer.propTypes = {
  public_id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  created_at: PropTypes.string
}

VideoContainer.defaultProps = {
  title: "No Title"
}
