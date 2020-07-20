import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import { Heading, Button, Box, Text, Container } from "gestalt"
import { Link, navigate } from "gatsby"
import SEO from "../components/seo"
import TwitterLink from "../components/twitter-link"
import useCache from "../hooks/cache"
import DownloadButton from "../components/download-button"
import Playlist from "../components/playlist"
import { Video, Transformation } from "cloudinary-react"
import { slug } from "../utils/slug"

export default ({ pageContext, location }) => {
  const {
    public_id,
    title,
    description,
    created_at,
    week,
    playlist,
    next
  } = pageContext
  const cached = useCache()
  const [downloadURL, setDownloadURL] = useState(null)
  const htmlVideoRef = React.createRef()
  useEffect(() => {
    if (htmlVideoRef.current && htmlVideoRef.current.currentSrc) {
      setDownloadURL(htmlVideoRef.current.currentSrc)
    }
  }, [htmlVideoRef])
  const playNext = () => {
    if (next) navigate(slug(next.public_id))
  }

  const is_cached = cached.find(result => result.match(new RegExp(public_id)))
  const image = `https://res.cloudinary.com/${
    process.env.GATSBY_CLOUDINARY_CLOUD_NAME
  }/video/upload/t_media_lib_thumb/${public_id}.jpg`
  const createdWhen = []
  if (week) createdWhen.push(`Week ${week}`)
  if (created_at) createdWhen.push(created_at)
  const createdWhenLabel = createdWhen.join(" - ")

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
          autoPlay="autoplay"
          cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
          publicId={public_id}
          secure={true}
          width="100%"
          onEnded={playNext}
        >
          <Transformation videoCodec="auto" quality={70} />
        </Video>
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
            {createdWhenLabel}
          </Text>
          <Box marginTop={2}>
            <Text>{description}</Text>
          </Box>
        </Box>

        <Box
          alignItems="center"
          alignContent="center"
          justifyContent="center"
          display="flex"
          paddingY={3}
        >
          {!is_cached && <DownloadButton url={downloadURL} />}
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
