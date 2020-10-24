import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import { Heading, Button, Box, Text, Container } from "gestalt"
import { Link, navigate } from "gatsby"
import SEO from "../components/seo"
import TwitterLink from "../components/twitter-link"
import Playlist from "../components/playlist"
import VideoPlayer from "../components/video-player"
import { slug } from "../utils/slug"
import CreatedWhen from "../components/created-when"
import VideoContext from "../context/video-context"
import useCache, { isCached } from "../hooks/cache"
import { Image } from "cloudinary-react"
import useCurrentSession from "../hooks/use-current-session"

const makeIterator = (playlist, startIndex, cached) =>
  async function* urls() {
    for (let index = startIndex + 1; index < playlist.length; index++) {
      const next = playlist[index]
      const is_cached = await isCached(next.public_id)

      if ((!navigator.onLine && is_cached) || navigator.onLine) {
        yield next
      }
    }
  }

export default ({ pageContext, location }) => {
  const {
    public_id,
    title,
    description,
    created_at,
    week,
    playlist,
    index,
    series
  } = pageContext

  const cached = useCache()
  const urls = makeIterator(playlist, index, cached)

  const playNext = async () => {
    const next = await urls().next()

    if (!next.done) navigate(slug(next.value.public_id))
  }

  const posterRef = useRef()

  const [image, setImage] = useState()
  const [baseUrl, setBaseUrl] = useState()
  const [videoExtension, setVideoExtension] = useState("webm")
  const { session, setShowAuth } = useCurrentSession()
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    setOffline(!navigator.onLine)
  }, [])

  const imagePlaceholder = (
    <Image
      cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
      resourceType="video"
      publicId={public_id + ".jpg"}
      innerRef={posterRef}
      onClick={() => setShowAuth(true)}
      width="100%"
    />
  )

  const videoPlayer = <VideoPlayer public_id={public_id} playNext={playNext} />

  const media = session || offline ? videoPlayer : imagePlaceholder

  useEffect(() => {
    if (posterRef.current) setImage(posterRef.current.src)
  }, [posterRef])

  return (
    <Layout>
      <VideoContext.Provider
        value={{ setBaseUrl, setVideoExtension, baseUrl, videoExtension }}
      >
        <SEO
          title={title}
          description={description}
          location={location.href}
          imageUrl={image}
        />

        <Container>
          <Box marginBottom={6} marginTop={6}>
            <Heading accessibilityLevel={1} paddingY={6}>
              {title}
            </Heading>
          </Box>
          {media}
          <aside>
            <Playlist playlist={playlist} height={200} current_id={public_id} />
          </aside>
          <Box paddingY={3}>
            <TwitterLink
              text={`I thought you'd enjoy this performance of "${title}" on Smiling Sessions. Share the smiles!`}
              url={location.href}
              via="ShapeshifterE17"
            >
              Share on Twitter
            </TwitterLink>
          </Box>

          <Box paddingY={6}>
            <Text color="gray" italic>
              <CreatedWhen
                week={week}
                created_at={created_at}
                series={series}
              />
            </Text>
            <Box marginTop={2}>
              <Text>{description}</Text>
            </Box>
          </Box>

          <Box paddingY={6}>
            <Link to="/">
              <Button text="Back" type="submit" inline />
            </Link>
          </Box>
        </Container>
      </VideoContext.Provider>
    </Layout>
  )
}
