import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Heading, Box, Text, Table, Image, Button } from "gestalt"
const About = () => (
  <Layout>
    <SEO title="About Smiling Sessions" />
    <Container>
      <Box paddingY={6}>
        <Heading>About Smiling Sessions</Heading>
        <Box marginTop={8}>
          <Image
            src="/images/you-are-my-sunshine.jpg"
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
              We thought we’d make the sing-alongs public so everyone can join!
              Singing is good for the brain, immune system, respiratory system
              and general well-being, to name a few benefits-oh yes -and it’s
              fun! A win-win situation, so please share this App with friends
              and family :-)
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
                    <Text>Bluetooth Speakers</Text>
                  </Table.Cell>
                  <Table.Cell>£10-£30</Table.Cell>
                  <Table.Cell>
                    To play the music in the corridors of care homes
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>
                    <Text>Earphones</Text>
                  </Table.Cell>
                  <Table.Cell>£20</Table.Cell>
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

            <a href="https://www.paypal.me/shapeshifterprod">
              <Button color="blue" text="Donate via PayPal" />
            </a>
          </Text>
        </Box>
      </Box>
    </Container>
  </Layout>
)

export default About
