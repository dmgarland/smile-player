import React from "react"
import { Box, Button, Column, Row, Stack, Text, Image, Heading } from "gestalt"
import Img from "gatsby-image"
import Price from "./price"
import { useShoppingCart } from "use-shopping-cart"

const Product = ({ product }) => {
  const { addItem, removeItem, cartDetails } = useShoppingCart()

  const sku = {
    sku: product.prices[0].id,
    name: product.name,
    price: product.prices[0].unit_amount,
    currency: product.prices[0].currency
  }

  const added = cartDetails[product.prices[0].id] !== undefined
  const AddItem = (
    <Button onClick={() => addItem(sku)} text="Donate this" inline />
  )
  const RemoveItem = (
    <Button
      onClick={() => removeItem(product.prices[0].id)}
      text="Remove Item"
      inline
    />
  )

  return (
    <Box
      display="flex"
      wrap
      justifyContent="center"
      marginBottom={6}
      color="white"
      padding={2}
      rounding={2}
    >
      <Column span={8} mdSpan={4}>
        {product.productImage ? (
          <Box marginBottom={4}>
            <Img
              fluid={product.productImage.childImageSharp.fluid}
              alt={product.name}
            />
          </Box>
        ) : null}
      </Column>
      <Column span={12} mdSpan={8}>
        <Box padding={3}>
          <Heading size="sm">{product.name}</Heading>
          <Box marginTop={3}>
            <Text>{product.description}</Text>
          </Box>
          <Box marginTop={3} marginBottom={3}>
            <Price price={product.prices[0]} />
          </Box>
          {added ? RemoveItem : AddItem}
        </Box>
      </Column>
    </Box>
  )
}

export default Product
