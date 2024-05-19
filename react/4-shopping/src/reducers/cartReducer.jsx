export const cartInitialState = []

export const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART'
}

export const cartReducer = (state, action) => {
  const { type, payload } = action

  if (type === CART_ACTIONS.ADD_TO_CART) {
    const productInCartIndex = state.findIndex(item => item.id === payload.id)

    if (productInCartIndex >= 0) {
      const newState = structuredClone(state)
      newState[productInCartIndex].quantity += 1
      return newState
    }

    return [
      ...state,
      {
        ...payload,
        quantity: 1
      }
    ]
  } else if (type === CART_ACTIONS.REMOVE_FROM_CART) {
    return state.filter(item => item.id !== payload.id)
  } else if (type === CART_ACTIONS.CLEAR_CART) {
    return cartInitialState
  }
  return state
}
