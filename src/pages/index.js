import React from "react"
import { Link, graphql } from "gatsby"
import { Heading, Button, Box, Text, IconButton } from "gestalt"
import { Video, Transformation } from "cloudinary-react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import useCache from "../hooks/cache"

const IndexPage = ({ data }) => {
  const videos = data.allCloudinaryMedia.edges
  const cached = useCache()

  return (
    <Layout>
      <SEO title="Home" />
      <Heading accessibilityLevel={2} paddingY={2} size="sm">
        Available Songs
      </Heading>
      {videos.map(({ node }, index) => {
        const htmlVideoRef = React.createRef()

        const video = (
          <Video
            crossOrigin="anonymous"
            cloudName="dymvtkv1m"
            publicId={node.public_id}
            innerRef={htmlVideoRef}
            preload="metadata"
            width="100%"
          >
            <Transformation width="400" height="300" gravity="center" />
          </Video>
        )
        const downloaded = cached.find(result =>
          result.match(new RegExp(node.public_id))
        )
        const label = downloaded ? "Saved" : "Download"

        return (
          <>
            <Box marginTop={6} marginBottom={-1}>
              {video}
            </Box>
            <Box
              key={index}
              alignItems="start"
              borderSize="sm"
              direction="row"
              display="flex"
              padding={3}
            >
              <Box marginTop={-1} paddingX={1} flex="grow">
                <Text weight="bold">Title</Text>
                <Text>Description</Text>
              </Box>
              <Box paddingX={1}>
                <Button
                  text={label}
                  onClick={() => fetch(htmlVideoRef.current.currentSrc)}
                  disabled={downloaded}
                  iconEnd="download"
                />
                <Box paddingY={1} />
                <Link to={`/${node.public_id}`}>
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
      })}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allCloudinaryMedia {
      edges {
        node {
          public_id
        }
      }
    }
  }
`
