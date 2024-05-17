const API_KEY = 'bef05f2f'

interface Props {
  search : string
}

export const searchMovies = async ({ search } : Props) => {
  if (search === '') return []

  try {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
    const data = await res.json()

    const movies = data.Search
  
    return movies.map((movie : any) => {
      return {
        id : movie.imdbID,
        title : movie.Title,
        year : movie.Year,
        poster : movie.Poster
      }
    })
  } catch (err) {
    throw new Error('Error when searching movies')
  }
}
