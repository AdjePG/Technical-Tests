import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../../hooks/useFilters'

export default function Filters () {
  const { filters, setFilters } = useFilters()
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleMinPriceChange = (e) => {
    const newMinPrice = e.target.value
    setFilters(prevState => ({
      ...prevState,
      minPrice: newMinPrice
    }))
  }

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value
    setFilters(prevState => ({
      ...prevState,
      category: newCategory
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor='category'>Category</label>
        <select id={categoryFilterId} onChange={handleCategoryChange}>
          <option value='all'>All</option>
          <option value='smartphones'>Smartphones</option>
          <option value='fragrances'>Fragrances</option>
        </select>
      </div>
      <div>
        <label htmlFor='price'>Price: <span>{filters.minPrice}</span>$</label>
        <input
          type='range'
          id={minPriceFilterId}
          onChange={handleMinPriceChange}
          min={0}
          max={2000}
          value={filters.minPrice}
        />
      </div>
    </section>
  )
}
