import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Products from "../components/products"
import { Container, Heading, Box, Text, Button, Link, Sticky } from "gestalt"
import { graphql } from "gatsby"
import Image from "gatsby-image"

const Donate = ({ data, location }) => {
  const image = data.file.childImageSharp.fluid
  const donationUrl = data.site.siteMetadata.donationUrl

  return (
    <Layout>
      <SEO
        title="Donate"
        description="Help us to keep creating uplifting videos for our carehomes and donate now"
        imageUrl={location.origin + image}
      />
      <Container>
        <Box paddingY={6}>
          <Heading>Support The Smiling Sessions</Heading>
          <Box marginTop={8}>
            <Text>
              <p>
                Your contribution will make an impact, whether you donate a
                little or a lot. Anything helps.{" "}
              </p>

              <p> Thank you for your support. </p>

              <p> The Smiling Team :-)</p>

              <Products />
            </Text>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default Donate

export const query = graphql`
  query {
    file(relativePath: { eq: "about.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    site {
      siteMetadata {
        donationUrl
      }
    }
  }
`
