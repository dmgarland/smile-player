import React from "react"
import { graphql } from "gatsby"
import { Heading } from "gestalt"
import Layout from "../components/layout"
import VideoContainer from "../components/video-container"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const videos = data.allCloudinaryMedia.edges

  return (
    <Layout>
      <SEO title="Home" />
      <Heading accessibilityLevel={2} paddingY={2} size="sm" color="orange">
        Available Songs
      </Heading>
      {videos.map(({ node }, index) => (
        <VideoContainer
          key={index}
          public_id={node.public_id}
          title={node.context && node.context.custom.caption}
          description={node.context && node.context.custom.alt}
          created_at={node.created_at}
          week={node.context.custom.week}
        />
      ))}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allCloudinaryMedia(filter: {tags: {eq: "live"}}, sort: { fields: context___custom___week }) {
      edges {
        node {
          public_id
          context {
            custom {
              alt
              caption
              week
            }
          }
        }
      }
    }
  }
`
