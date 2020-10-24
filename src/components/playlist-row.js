import React, { useEffect, useLayoutEffect, useRef } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Image } from "cloudinary-react"
import { Row, Heading, Box, Stack, Column } from "gestalt"
import "gestalt/dist/gestalt.css"

import { slug } from "../utils/slug"
import CreatedWhen from "./created-when"
import DownloadButton from "../components/download-button"
import useCurrentSession from "../hooks/use-current-session"

const PlaylistRow = ({ public_id, title, week, created_at, active }) => {
  const containerRef = useRef()
  const { session } = useCurrentSession()

  useLayoutEffect(() => {
    const element = containerRef.current
    if (element && active) {
      element.offsetParent.scrollTo({
        top: element.offsetTop,
        behavior: "smooth"
      })
    }
  }, [active, containerRef])

  return (
    <div ref={containerRef}>
      <Box
        className={active ? "borderColorRed" : "borderColorGray"}
        color="darkGray"
        borderStyle="sm"
        display="flex"
        direction="row"
        wrap
      >
        <Column span={12} mdSpan={9}>
          <Row alignItems="start">
            <Link to={`/${slug(public_id)}`}>
              <Image
                crossOrigin="anonymous"
                cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
                publicId={public_id + ".jpg"}
                secure="true"
                resourceType="video"
                transformation="media_lib_thumb"
              />
            </Link>
            <Stack padding={3}>
              <Link to={`/${slug(public_id)}`}>
                <Heading accessibilityLevel={3} size="sm" color="white">
                  {title}
                </Heading>
                <Box marginTop={2}>
                  <CreatedWhen week={week} created_at={created_at} />
                </Box>
              </Link>
            </Stack>
          </Row>
        </Column>
        <Column span={12} mdSpan={3}>
          <Row
            justifyContent="center"
            alignItems="center"
            height="100%"
            padding={3}
          >
            {session && <DownloadButton public_id={public_id} />}
          </Row>
        </Column>
      </Box>
    </div>
  )
}

export default PlaylistRow

PlaylistRow.propTypes = {
  public_id: PropTypes.string,
  title: PropTypes.string,
  created_at: PropTypes.string,
  week: PropTypes.number
}

PlaylistRow.defaultProps = {
  title: "No Title"
}
