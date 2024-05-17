import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../service/moviesService'
import { Movie } from '../types'

interface Props {
  search : string
  sort : boolean
}

export function useMovie ({ search, sort } : Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ movies, setMovies ] = useState<Movie[]>([])
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ error, setError ] = useState<string | null>(null)
  const previousSearch = useRef<string | null>(search)

  const getMovies = useCallback(async ( { search } : { search : string } ) => {
    if (previousSearch.current === search) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (err : any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies]) 

  return { movies: sortedMovies, loading, getMovies }
}