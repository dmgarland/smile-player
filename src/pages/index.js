import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Container } from "gestalt"
import VideoContainer from "../components/video-container"
import SEO from "../components/seo"
import logo from "../images/sunshine-fading.svg"

const IndexPage = ({ data, location }) => {
  const videos = data.allCloudinaryMedia.edges
  const metadata = data.site.siteMetadata

  return (
    <Layout>
      <SEO
        title={metadata.title}
        description={metadata.description}
        imageUrl={location.origin + logo}
        location={location.href}
      />
      <Container>
        {videos
          .sort(
            (a, b) => b.node.context.custom.week - a.node.context.custom.week
          )
          .map(({ node }, index) => (
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
    allCloudinaryMedia(
      filter: { tags: { eq: "live" } }
      sort: { fields: context___custom___week, order: DESC }
    ) {
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
    site {
      siteMetadata {
        title
      }
    }
  }
`
