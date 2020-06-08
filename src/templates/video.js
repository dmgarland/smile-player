import React from "react"
import { Video, Transformation } from "cloudinary-react"
import Layout from "../components/layout"
import { Heading, Button, Box, Text, Container } from "gestalt"
import { Link } from "gatsby"
import SEO from "../components/seo"

export default ({ pageContext, location }) => {
  const { public_id, title, description, created_at, week } = pageContext
  const image = `https://res.cloudinary.com/${
    process.env.GATSBY_CLOUDINARY_CLOUD_NAME
  }/video/upload/t_media_lib_thumb/${public_id}.jpg`
  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        location={location.origin}
        imageUrl={image}
      />

      <Container>
        <Box marginBottom={6} marginTop={6}>
          <Heading accessibilityLevel={1} paddingY={6}>
            {title}
          </Heading>
        </Box>
        <Video
          crossOrigin="anonymous"
          controls
          autoPlay="autoplay"
          cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
          publicId={public_id}
          width="100%"
          secure={true}
        >
          <Transformation videoCodec="auto" quality={70} />
        </Video>

        <Box paddingY={6}>
          <Text>{description}</Text>
          <Box marginTop={2}>
            <Text color="gray" italic>
              Week {week} - {created_at}
            </Text>
          </Box>
        </Box>
        <Box paddingY={6}>
          <Link to="/">
            <Button text="Back" type="submit" inline />
          </Link>
        </Box>
      </Container>
    </Layout>
  )
}
