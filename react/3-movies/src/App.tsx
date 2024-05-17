import { useCallback, useState } from 'react'
import './App.css'
import Movies from './components/moviesList'
import { useMovie } from './hooks/useMovie'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() {
  const [sort, setSort] = useState<boolean>(false)
  const { search, error, setSearch } = useSearch()
  const { movies, loading, getMovies } = useMovie( { search, sort })

  const debouncedGetMovies = useCallback(debounce((search : string) => {
    getMovies( { search } )
  }, 500), [])

  const handleSubmit = (e : any) => {
    e.preventDefault()
    // const { query } = Object.fromEntries(new FormData(e.target))
    // setQuery(query.toString())
    getMovies( { search } )
  }

  const handleChange = (e : any) => {
    const newSearch = e.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='app'>
      <h1>Movie Search</h1>
      <form action="" onSubmit={handleSubmit}>
        <input onChange={handleChange} value={search} name="query" type="text" placeholder='Avengers, Star Wars, The Matrix...'/>
        <input type="checkbox" onChange={handleSort} checked={sort} />
        <button type='submit'>Search</button>
      </form>

      {error && <p style={{color : 'red'}}>{error}</p>}

      <main>
        {
          loading 
            ? <p>Loading...</p>
            : <Movies movies={movies}/>
        }
        
      </main>
    </div>
  )
}

export default App
