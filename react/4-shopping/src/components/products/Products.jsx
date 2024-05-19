import { useCart } from '../../hooks/useCart'
import './Products.css'

export default function Products ({ products }) {
  const { addToCart, removeFromCart, cart } = useCart()

  const checkProductInCart = (product) => {
    return cart.some(item => item.id === product.id)
  }

  return (
    <main className='container'>
      <ul className='list'>
        {products.map(product => {
          const productInCart = checkProductInCart(product)

          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={`Image of '${product.title}'`} />
              <div>
                <p><strong>{product.title}</strong> - {product.price}$</p>
              </div>
              <div>
                <button onClick={() => (!productInCart ? addToCart(product) : removeFromCart(product))}>
                  {
                    productInCart
                      ? 'Remove from cart'
                      : 'Add to cart'
                  }
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
