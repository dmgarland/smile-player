import React, { useLayoutEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Image } from "cloudinary-react"
import { Row, Heading, Box, Stack } from "gestalt"
import { slug } from "../utils/slug"
import CreatedWhen from "./created-when"

const PlaylistRow = ({ public_id, title, week, created_at, active }) => {
  const containerRef = React.createRef()

  useLayoutEffect(() => {
    const element = containerRef.current
    if (element && active) {
      console.log(element, element.scrollTop, element.offsetParent)
      element.offsetParent.scrollTo({
        top: element.offsetTop,
        behavior: "smooth"
      })
    }
  }, [active, containerRef])

  return (
    <Link to={`/${slug(public_id)}`} ref={containerRef}>
      <Row
        gap={1}
        alignItems="start"
        borderSize={active ? "sm" : "none"}
        color="darkGray"
        id={slug(title)}
      >
        <Image
          crossOrigin="anonymous"
          cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
          publicId={public_id + ".jpg"}
          secure="true"
          resourceType="video"
          transformation="media_lib_thumb"
        />
        <Stack paddingY={1}>
          <Heading accessibilityLevel={3} size="sm" color="white">
            {title}
          </Heading>
          <Box marginTop={2}>
            <CreatedWhen week={week} created_at={created_at} />
          </Box>
        </Stack>
      </Row>
    </Link>
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
