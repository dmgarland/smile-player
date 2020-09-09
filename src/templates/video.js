import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import { Heading, Button, Box, Text, Container } from "gestalt"
import { Link, navigate } from "gatsby"
import SEO from "../components/seo"
import TwitterLink from "../components/twitter-link"
import Playlist from "../components/playlist"
import { Video, Transformation } from "cloudinary-react"
import { slug } from "../utils/slug"
import CreatedWhen from "../components/created-when"
import VideoContext from "../context/video-context"
import useCache, { isCached } from "../hooks/cache"

const makeIterator = (playlist, startIndex, cached) =>
  async function* urls() {
    for (let index = startIndex + 1; index < playlist.length; index++) {
      const next = playlist[index]
      const is_cached = await isCached(next.public_id)
      console.log(is_cached)

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
    series,
  } = pageContext

  const cached = useCache()
  const urls = makeIterator(playlist, index, cached)

  const playNext = async () => {
    const next = await urls().next()

    if (!next.done) navigate(slug(next.value.public_id))
  }

  const htmlVideoRef = useRef()

  const [image, setImage] = useState()
  const [baseUrl, setBaseUrl] = useState()
  const [videoExtension, setVideoExtension] = useState()

  useEffect(() => {
    setImage(htmlVideoRef.current.poster)
    const setUrl = event => {
      const url = htmlVideoRef.current.currentSrc
      setBaseUrl(url.split("/").slice(0, -2).join("/"))
      setVideoExtension(url.split(".").slice(-1)[0])
    }
    htmlVideoRef.current.addEventListener("loadeddata", setUrl)

    return () => {
      htmlVideoRef.current.removeEventListener("loadeddata", setUrl)
    }
  }, [htmlVideoRef])

  return (
    <Layout>
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

        <Video
          crossOrigin="anonymous"
          controls
          autoPlay
          cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
          publicId={public_id}
          secure={true}
          width="100%"
          onEnded={playNext}
          innerRef={htmlVideoRef}
        >
          <Transformation videoCodec="auto" quality={70} />
        </Video>
        <aside>
          <VideoContext.Provider value={{ baseUrl, videoExtension }}>
            <Playlist playlist={playlist} height={200} current_id={public_id} />
          </VideoContext.Provider>
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
            <CreatedWhen week={week} created_at={created_at} series={series} />
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
    </Layout>
  )
}
