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
                series
                go_live
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
    go_live: node.context.custom.go_live,
    series: node.context.custom.series
  })

  const allSeries = [
    { tag: "1", title: "Series 1", path: "series-1" },
    { tag: "2", title: "Series 2", path: "series-2", homepage: true },
    { tag: "winter", title: "Winter Sessions", path: "winter-sessions" }
  ]
  let playlist

  allSeries.forEach(series => {
    playlist = result.data.allCloudinaryMedia.edges
      .map(transform)
      .filter(node => node.series == series.tag)
      .sort((a, b) => b.week - a.week)

    playlist.forEach((item, index) =>
      createPage({
        path: slug(item.public_id),
        component: path.resolve("src/templates/video.js"),
        context: { ...item, playlist, index, series }
      })
    )

    createPage({
      path: series.path,
      component: path.resolve("src/templates/series.js"),
      context: { playlist, series }
    })

    if (series.homepage) {
      createPage({
        path: "/",
        component: path.resolve("src/templates/series.js"),
        context: { playlist, series: series }
      })
    }
  })
}

module.exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type CloudinaryMediaContextCustom {
      alt: String!
      caption: String!
      week: Int
      series: String
      go_live: String
      created_at: String
    }
  `)
}
