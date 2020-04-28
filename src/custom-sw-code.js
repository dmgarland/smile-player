workbox.routing.registerRoute(
  /^https:\/\/res.cloudinary.com\/.*(.webm|.mov|.mp4)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "video-cache",
    plugins: [
      new workbox.cacheableResponse.Plugin({ statuses: [200] }),
      new workbox.rangeRequests.Plugin()
    ]
  }),
  "GET"
)
