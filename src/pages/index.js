import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Container } from "gestalt"
import VideoContainer from "../components/video-container"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const videos = data.allCloudinaryMedia.edges

  return (
    <Layout>
      <SEO title="Home" />
          <Container>
      {videos.map(({ node }, index) => (
        <VideoContainer
          key={index}
          public_id={node.public_id}
          title={node.context && node.context.custom.caption}
          description={node.context && node.context.custom.alt}
          created_at={node.context.custom.created_at}
          week={node.context.custom.week}
        />
      ))}
      </Container>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allCloudinaryMedia(filter: {tags: {eq: "live"}}, sort: { fields: context___custom___week, order: DESC  }) {
      edges {
        node {
          public_id
          context {
            custom {
              alt
              caption
              week
              created_at
            }
          }
        }
      }
    }
  }
`
