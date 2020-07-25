const path = require("path")
const { slug } = require("./src/utils/slug")

module.exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allCloudinaryMedia(filter: { tags: { eq: "live" } }) {
        edges {
          node {
            public_id
            context {
              custom {
                alt
                caption
                week
                created_at
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.error(result.errors)
  }

  const playlist = result.data.allCloudinaryMedia.edges
    .map(({ node }) => ({
      public_id: node.public_id,
      title: node.context && node.context.custom.caption,
      description: node.context && node.context.custom.alt,
      created_at: node.context.custom.created_at,
      week: node.context.custom.week,
    }))
    .sort((a, b) => b.week - a.week)

  playlist.forEach((item, index) =>
    createPage({
      path: slug(item.public_id),
      component: path.resolve("src/templates/video.js"),
      context: { ...item, playlist, index },
    })
  )
}

module.exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type CloudinaryMediaContextCustom {
      alt: String!
      caption: String!
      week: Int!
      created_at: String
    }
  `)
}
