import React from "react"
import { Link, graphql } from "gatsby"
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
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      {videos.map(({ node }, index) => {
        const htmlVideoRef = React.createRef()

        const video = (
          <Video
            width="300"
            crossOrigin="anonymous"
            cloudName="dymvtkv1m"
            publicId={node.public_id}
            controls={true}
            innerRef={htmlVideoRef}
          >
            <Transformation videoCodec="auto" />
          </Video>
        )
        const downloaded = cached.find(result =>
          result.match(new RegExp(node.public_id))
        )
        const label = downloaded ? "Already Downloaded" : "Download"

        return (
          <div key={index}>
            {video}
            <button
              onClick={() => fetch(htmlVideoRef.current.currentSrc)}
              disabled={downloaded}
            >
              {label}
            </button>
          </div>
        )
      })}
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
