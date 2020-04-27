const React = require("react")
const { CloudinaryContext } = require("cloudinary-react")

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )

  if (answer === true) {
    window.location.reload()
  }
}

export const wrapRootElement = ({ element, props }) => (
  <CloudinaryContext
    cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
    {...props}
  >
    {element}
  </CloudinaryContext>
)
