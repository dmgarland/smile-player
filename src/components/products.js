import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Box, Heading, Text, Button } from "gestalt"
import Img from "gatsby-image"
import Price from "./price"
import Product from "./product"

export default function ProductsTable() {
  const data = useStaticQuery(graphql`
    query StripeProducts {
      allStripeProduct(
        filter: {
          active: { eq: true }
          prices: { elemMatch: { currency: { eq: "gbp" } } }
        }
        sort: { order: ASC, fields: name }
      ) {
        edges {
          node {
            id
            productImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            description
            livemode
            name
            type
            updated
            active
            created
            prices {
              id
              active
              billing_scheme
              created
              currency
              livemode
              recurring {
                interval
                interval_count
                trial_period_days
                usage_type
              }
              type
              unit_amount
              unit_amount_decimal
            }
          }
        }
      }
    }
  `)
  const products = data.allStripeProduct.edges.map(({ node: product }) => (
    <Product product={product} />
  ))

  return <>{products}</>
}
