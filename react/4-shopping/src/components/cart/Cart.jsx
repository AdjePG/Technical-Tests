import { useId } from 'react'
import './Cart.css'
import { useCart } from '../../hooks/useCart'

export default function Cart () {
  const { cart, clearCart, addToCart } = useCart()
  const cartCheckboxId = useId()

  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>Cart</label>
      <input className='check' id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {cart.map(product => (
            <li key={product.id}>
              <img src={product.thumbnail} alt="Image of 'iPhone 9'" />
              <div>
                <p><strong>{product.title}</strong> - {product.price}$</p>
              </div>
              <div>
                <span>
                  {product.quantity}
                </span>
                <button onClick={() => addToCart(product)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button onClick={clearCart}>
          Clear
        </button>
      </aside>
    </>
  )
}
