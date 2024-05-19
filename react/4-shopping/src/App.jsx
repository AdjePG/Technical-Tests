import './App.css'
import Products from './components/products/Products'
import { products as initialProducts } from './data/mocks/products.json'
import Filters from './components/filters/Filters'
import { useFilters } from './hooks/useFilters'
import Cart from './components/cart/Cart'
import { CartProvider } from './contexts/cartContext'

export default function App () {
  const { filterProducts } = useFilters()
  const filteredProducts = filterProducts(initialProducts)

  return (
    <CartProvider className='app'>
      <header>
        <h1>Shopping</h1>
        <Filters />
      </header>
      <Cart />
      <Products products={filteredProducts} />
    </CartProvider>
  )
}
