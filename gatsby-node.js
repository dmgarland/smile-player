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

  result.data.allCloudinaryMedia.edges.forEach(({ node }) =>
    createPage({
      path: slug(node.public_id),
      component: path.resolve("src/templates/video.js"),
      context: {
        public_id: node.public_id,
        title: node.context && node.context.custom.caption,
        description: node.context && node.context.custom.alt,
        created_at: node.context.custom.created_at,
        week: node.context.custom.week,
      },
    })
  )
}
