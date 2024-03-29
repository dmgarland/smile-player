require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Smiling Sessions`,
    description: `The Smiling Sessions App provides a mobile video experience that puts a smile on your face`,
    author: `@ShapeshifterE17`,
    donationUrl: "http://www.shapeshifter-productions.com/donate-2/",
    homepageUrl: "http://www.shapeshifter-productions.com",
  },
  plugins: [
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.GATSBY_CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        resourceType: `video`,
        context: true,
        tags: true,
        maxResults: 100,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Smile Player",
        short_name: "SmilePlayer",
        start_url: "/",
        background_color: "#f8cf01",
        theme_color: "#f8cf01",
        display: "minimal-ui",
        icon: "src/images/sunshine.svg",
        lang: "en",
        cache_busting_mode: "none",
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        appendScript: require.resolve(`./src/custom-sw-code.js`),
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
        anonymize: true,
      },
    },
    `gatsby-plugin-twitter`,
  ],
}
