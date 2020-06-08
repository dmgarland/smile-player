import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Heading, Box, Text, Table, Image, Button } from "gestalt"
import image from "../images/about.jpg"
import { Image as GatsbyImage, graphql } from "gatsby"

const About = ({ aboutImage, location }) => (
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
            src={image}
            alt="The Smiling Sessions Players performing You Are My Sunshine"
            naturalWidth={1920}
            naturalHeight={1080}
          />
          <Text>
            <p>
              The Smiling Sessions sing alongs are being created as weekly video
              songs (with on screen lyrics) to reach our most isolated and
              vulnerable senior citizens in care homes and sheltered/supported
              housing schemes. The aim is to lift spirits, increase morale and
              well-being during these difficult times through connecting and
              singing.
            </p>

            <p>
              Singing is good for the brain, immune system, respiratory system
              and general well-being, to name a few benefits - and it’s fun!
            </p>

            <p>
              If you value the work of Shapeshifter Productions, please consider
              supporting us at this time with a donation. Here’s a few examples
              of what’s needed:
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
              Your contribution will make an impact, whether you donate a little
              or a lot. Anything helps. Thank you for your support. The Smiling
              Team :-)
            </p>
          </Text>

          <Text align="center">
            <a href="https://www.paypal.me/shapeshifterprod">
              <Button color="blue" text="Donate via PayPal" inline />
            </a>
          </Text>
        </Box>
      </Box>
    </Container>
  </Layout>
)

export default About

export const query = graphql`
  query {
    file(relativePath: { eq: "src/images/about.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
