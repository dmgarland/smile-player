import React from "react"
import { useShoppingCart } from "use-shopping-cart"
import { Box, Text, Button, Icon } from "gestalt"
import { navigate } from "gatsby"

const Basket = ({}) => {
  const {
    formattedTotalPrice,
    cartCount,
    redirectToCheckout
  } = useShoppingCart()

  const label =
    cartCount > 0
      ? `Purchase ${cartCount} item${cartCount === 1 ? "" : "s"}`
      : "Donate"

  return (
    <Button
      onClick={() =>
        cartCount > 0 ? redirectToCheckout() : navigate("/donate")
      }
      text={label}
      color="blue"
      iconEnd="shopping-bag"
      inline
      size="lg"
    />
  )
}

export default Basket
