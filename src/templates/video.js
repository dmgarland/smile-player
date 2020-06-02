import React from "react"
import { Video, Transformation } from "cloudinary-react"
import Layout from "../components/layout"
import { Heading, Button, Box, Text } from "gestalt"
import { Link } from "gatsby"

export default ({ pageContext }) => {
  const { public_id, title, description, created_at } = pageContext

  return (
    <Layout>
      <Box marginBottom={6}>
        <Heading accessibilityLevel={1} paddingY={6}>
          {title}
        </Heading>
      </Box>
      <Video
        crossOrigin="anonymous"
        controls
        autoplay="autoplay"
        cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
        publicId={public_id}
        width="100%"
        secure={true}
      >
        <Transformation videoCodec="auto" />
      </Video>

      <Box paddingY={6}>
        <Text>{description}</Text>
        <Box marginTop={2}>
          <Text color="gray" italic>
            Added {created_at}
          </Text>
        </Box>
      </Box>
      <Box paddingY={6}>
        <Link to="/">
          <Button text="Back" type="submit" inline />
        </Link>
      </Box>
    </Layout>
  )
}
