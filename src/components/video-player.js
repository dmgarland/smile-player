import React, { useContext, useRef } from "react"
import { Video, Transformation } from "cloudinary-react"
import VideoContext from "../context/video-context"

export default ({ public_id, playNext }) => {
  const htmlVideoRef = useRef()
  const { setBaseUrl, setVideoExtension } = useContext(VideoContext)

  const updateUrl = () => {
    const url = htmlVideoRef.current.currentSrc
    setBaseUrl(
      url
        .split("/")
        .slice(0, -2)
        .join("/")
    )

    setVideoExtension(url.split(".").slice(-1)[0])
  }

  return (
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
      onLoadedData={updateUrl}
    >
      <Transformation videoCodec="auto" quality={70} />
    </Video>
  )
}
