const React = require("react")
const { CloudinaryContext } = require("cloudinary-react")
const { loadStripe } = require("@stripe/stripe-js")
const { CartProvider } = require("use-shopping-cart")

export const onServiceWorkerUpdateReady = () => window.swUpdateShowToast(true)

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

export const wrapRootElement = ({ element, props }) => (
  <CartProvider
    mode="client-only"
    stripe={stripePromise}
    currency="GBP"
    successUrl="http://localhost:8000"
    cancelUrl="http://localhost:8000/donate"
  >
    <CloudinaryContext
      cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
      {...props}
    >
      {element}
    </CloudinaryContext>
  </CartProvider>
)
