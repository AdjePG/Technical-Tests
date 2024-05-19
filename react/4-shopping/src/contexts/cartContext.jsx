import { createContext, useReducer } from 'react'
import { CART_ACTIONS, cartInitialState, cartReducer } from '../reducers/cartReducer'

export const CartContext = createContext()

export function CartProvider ({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = (product) => dispatch({
    type: CART_ACTIONS.ADD_TO_CART,
    payload: product
  })

  const removeFromCart = (product) => dispatch({
    type: CART_ACTIONS.REMOVE_FROM_CART,
    payload: product
  })

  const clearCart = (product) => dispatch({
    type: CART_ACTIONS.CLEAR_CART,
    payload: product
  })

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
