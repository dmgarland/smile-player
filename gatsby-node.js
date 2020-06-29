const path = require("path")
const { slug } = require("./src/utils/slug")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

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
                series
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

  const transform = ({ node }) => ({
    public_id: node.public_id,
    title: node.context && node.context.custom.caption,
    description: node.context && node.context.custom.alt,
    created_at: node.context.custom.created_at,
    week: node.context.custom.week,
    series: parseInt(node.context.custom.series),
  })

  const allSeries = [1, 2]
  let playlist

  allSeries.forEach(series => {
    playlist = result.data.allCloudinaryMedia.edges
      .map(transform)
      .filter(node => node.series === series)
      .sort((a, b) => b.week - a.week)

    playlist.forEach((item, index) =>
      createPage({
        path: slug(item.public_id),
        component: path.resolve("src/templates/video.js"),
        context: { ...item, playlist, index, series },
      })
    )

    createPage({
      path: `series-${series}`,
      component: path.resolve("src/templates/series.js"),
      context: { playlist, series },
    })
  })

  createPage({
    path: "/",
    component: path.resolve("src/templates/series.js"),
    context: { playlist, series: 2 },
  })
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions
  const typeDefs = `
    type StripeProduct implements Node {
      prices: [StripePrice] @link(by: "product", from: "id")
    }
    type StripePrice implements Node {
      relatedProduct: StripeProduct @link(from: "product")
    }

    type CloudinaryMediaContextCustom {
      alt: String!
      caption: String!
      week: Int!
      series: Int!
      created_at: String
    }
`
  createTypes(typeDefs)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  if (node.internal.type === "StripeProduct" && node.images.length) {
    await Promise.all(
      node.images.map(async url => {
        let fileNode = await createRemoteFileNode({
          url,
          parentNodeId: node.id,
          createNode,
          createNodeId,
          cache,
          store,
        })

        if (fileNode) node.productImage___NODE = fileNode.id
      })
    )
  }
}
