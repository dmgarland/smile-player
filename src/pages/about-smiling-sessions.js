import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Heading, Box, Text, Table, Button, Link } from "gestalt"
import { graphql } from "gatsby"
import Image from "gatsby-image"

const About = ({ data, location }) => {
  const image = data.file.childImageSharp.fluid
  const donationUrl = data.site.siteMetadata.donationUrl

  return (
    <Layout>
      <SEO
        title="About Smiling Sessions"
        description="The Smiling Sessions are weekly video songs to reach isolated and vulnerable senior citizens in care homes featuring celebrity musicians"
        imageUrl={location.origin + image}
      />
      <Container>
        <Box paddingY={6}>
          <Heading>About Smiling Sessions</Heading>
          <Box marginTop={8}>
            <Image
              fluid={image}
              alt="The Smiling Sessions Players performing You Are My Sunshine"
            />
            <Text>
              <p>
                For 10 years, The Smiling Sessions have offered participatory,
                high quality singing experiences for senior citizens in care
                homes and sheltered housing in deprived areas of London, helping
                them become more integrated and stay healthy and active. Now, in
                these unprecedented times, we are keener than ever to harness
                the power of music and singing to support their wellbeing and
                mental health, not only in London but across the U.K., Ireland
                and beyond!{" "}
              </p>

              <p>
                The weekly Smiling video sessions is our way of reaching out in
                a safe, remote way – many residents are completely confined to
                one small room 24/7. We want to help keep their spirits up and
                let them know we’re thinking about them.
              </p>

              <p>
                The sessions are filmed by our fabulous musicians and the
                occasional celebrity guest and created as videos (with on screen
                lyrics) which we upload to the app every Monday. The videos are
                building a library of 15 songs a set that can be used over and
                over as a download or for streaming. Set 2 will start in
                September.
              </p>
              <p>
                We hope our weekly singalong sessions will increase morale and
                well-being for isolated and older people during these difficult
                times.
              </p>
              <p>
                Please consider supporting us at this time. We want to sing,
                connect and communicate with as many vulnerable and isolated
                older people as possible.{" "}
                <Link href={donationUrl}>Click here</Link> to make a donation.
              </p>

              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <Text weight="bold">Equipment</Text>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Text weight="bold">Cost</Text>
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Text weight="bold">Purpose</Text>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Text>One month of phone calls</Text>
                    </Table.Cell>
                    <Table.Cell>£15</Table.Cell>
                    <Table.Cell>
                      To care homes and sheltered housing schemes
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Text>Bluetooth Speakers</Text>
                    </Table.Cell>
                    <Table.Cell>£20-£30</Table.Cell>
                    <Table.Cell>
                      To play the music in the corridors of care homes
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Text>Tablets</Text>
                    </Table.Cell>
                    <Table.Cell>£30-£50</Table.Cell>
                    <Table.Cell>To play the videos</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <p>
                Your contribution will make an impact, whether you donate a
                little or a lot. Anything helps.{" "}
              </p>

              <p> Thank you for your support. </p>

              <p> The Smiling Team :-)</p>
            </Text>

            <Text align="center">
              <a href={donationUrl}>
                <Button color="blue" text="Donate via PayPal" inline />
              </a>
            </Text>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default About

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
