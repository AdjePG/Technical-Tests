import { useContext } from 'react'
import { CartContext } from '../contexts/cartContext'

export function useCart () {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart must be inside a CartProvider')
  }

  return context
}
