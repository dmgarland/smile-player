import React from "react"
import { Video, Transformation } from "cloudinary-react"
import Layout from "../components/layout"
import { Heading, Button, Box, Text, IconButton } from "gestalt"
import { Link, graphql } from "gatsby"

export default ({ pageContext }) => {
  const { public_id } = pageContext

  return (
    <Layout>
      <Heading accessibilityLevel={1} paddingY={6}>
        Title
      </Heading>
      <Video
        crossOrigin="anonymous"
        controls
        cloudName="dymvtkv1m"
        publicId={public_id}
        width="100%"
      />
      <Box paddingY={12}>
        <Link to="/">
          <Button text="Back" type="submit" inline />
        </Link>
      </Box>
    </Layout>
  )
}
