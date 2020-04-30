const path = require("path")

module.exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allCloudinaryMedia {
        edges {
          node {
            public_id
            context {
              custom {
                alt
                caption
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
      path: node.public_id,
      component: path.resolve("src/templates/video.js"),
      context: {
        public_id: node.public_id,
        title: node.context && node.context.custom.caption,
        description: node.context && node.context.custom.alt,
      },
    })
  )
}
