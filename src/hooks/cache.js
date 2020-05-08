import { useEffect, useState } from "react"

const useCache = () => {
  const [cached, setCached] = useState([])

  useEffect(() => {
    caches
      .open("video-cache")
      .then(cache => cache.keys())
      .then(keys => keys.map(req => req.url))
      .then(urls => setCached(urls))
  }, [])

  return cached
}

export default useCache
