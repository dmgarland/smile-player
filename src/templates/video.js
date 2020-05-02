import React from "react"
import { Video, Transformation } from "cloudinary-react"
import Layout from "../components/layout"
import { Heading, Button, Box, Text, IconButton } from "gestalt"
import { Link, graphql } from "gatsby"

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
        cloudName="dymvtkv1m"
        publicId={public_id}
        width="100%"
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
