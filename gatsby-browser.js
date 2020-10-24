const React = require("react")
const { CloudinaryContext } = require("cloudinary-react")
const { SessionProvider } = require("./src/hooks/use-current-session")

export const onServiceWorkerUpdateReady = () => window.swUpdateShowToast(true)

export const wrapRootElement = ({ element, props }) => (
  <CloudinaryContext
    cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
    {...props}
  >
    <SessionProvider>{element}</SessionProvider>
  </CloudinaryContext>
)
