import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Privacy from "../components/privacy"
import { Container, Box, Heading } from "gestalt"

const Page = () => (
  <Layout>
    <SEO
      title="Privacy Policy"
      description="Our privacy policy on how, what and why your data is processed"
    />

    <Container>
      <Box paddingY={6}>
        <Heading>Privacy and Data Protection Policy</Heading>
        <Privacy />
      </Box>
    </Container>
  </Layout>
)

export default Page
