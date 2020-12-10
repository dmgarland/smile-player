import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Container } from "gestalt"
import VideoContainer from "../components/video-container"
import SEO from "../components/seo"
import logo from "../images/sunshine-fading.svg"

const IndexPage = ({ data, location, pageContext }) => {
  const { playlist, series } = pageContext
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
        <h2>{series.title}</h2>
        {playlist.map((entry, index) => (
          <VideoContainer key={index} {...entry} />
        ))}
      </Container>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
