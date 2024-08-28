import React from 'react'

const CartContext = React.createContext({
  productData: [],
  onProductData: () => {},
  removeAllCartItems: () => {},

  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
