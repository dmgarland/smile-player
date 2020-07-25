import { useEffect, useState } from "react"
import { encodePublicId } from "../utils/public-id"

const getCacheUrls = () =>
  caches
    .open("video-cache")
    .then(cache => cache.keys())
    .then(keys => keys.map(req => req.url))

const useCache = () => {
  const [cached, setCached] = useState([])

  useEffect(() => {
    getCacheUrls().then(urls => setCached(urls))
  }, [])

  return cached
}

const isCached = async public_id =>
  !!(await getCacheUrls().then(urls =>
    urls.find(url => url.match(encodePublicId(public_id)))
  ))

export default useCache

export { isCached }
