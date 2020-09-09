import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Image } from "cloudinary-react"
import { Heading, IconButton, Box, Text, Card } from "gestalt"
import { slug } from "../utils/slug"
import CreatedWhen from "./created-when"

const VideoContainer = ({
  public_id,
  title,
  description,
  week,
  created_at,
}) => (
  <Box
    marginBottom={6}
    mdPadding={2}
    smColumn={12}
    mdColumn={6}
    display="inlineBlock"
  >
    <Box color="white" borderSize="sm" mdPadding={2} rounding={3}>
      <Card
        image={
          <Link to={`/${slug(public_id)}`}>
            <Image
              crossOrigin="anonymous"
              cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
              publicId={public_id + ".jpg"}
              width="100%"
              secure="true"
              resourceType="video"
            />
          </Link>
        }
      >
        <Link to={`/${slug(public_id)}`}>
          <Box alignItems="start" direction="row" display="flex" padding={3}>
            <Box marginTop={-1} paddingX={1} flex="grow">
              <Box marginTop={2}>
                <Heading accessibilityLevel={3} size="sm">
                  {title}
                </Heading>
              </Box>
              <Box marginTop={2}>
                <CreatedWhen week={week} created_at={created_at} />
              </Box>
              <Box marginTop={2}>
                <Text color="gray">{description}</Text>
              </Box>
            </Box>
            <Box paddingX={1}>
              <IconButton
                icon="play"
                inline
                type="submit"
                accessibilityLabel="Play"
              />
            </Box>
          </Box>
        </Link>
      </Card>
    </Box>
  </Box>
)

export default VideoContainer

VideoContainer.propTypes = {
  public_id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  created_at: PropTypes.string,
}

VideoContainer.defaultProps = {
  title: "No Title",
}
