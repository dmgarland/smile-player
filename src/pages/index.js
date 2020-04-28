import React from "react"
import { Link, graphql } from "gatsby"
import { Video, Transformation } from "cloudinary-react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const videos = data.allCloudinaryMedia.edges
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <script>
        fetch('http://res.cloudinary.com/dymvtkv1m/video/upload/vc_auto/v1/samples/elephants.webm')
      </script>
      {videos.map(({ node }, index) => (
        <Video
          crossOrigin="anonymous"
          cloudName="dymvtkv1m"
          publicId={node.public_id}
          key={index}
          controls="true"
        >
          <Transformation videoCodec="auto" />
        </Video>
      ))}
      <Link to="/page-2/">Go to page 2</Link>
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
