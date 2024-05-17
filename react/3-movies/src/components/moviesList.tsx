import { Movie } from "../types"

interface Props {
  movies : Movie[]
}

function MoviesList ( { movies } : Props ) {
  return (
    <ul className="movies">
      {movies.map(movie => (
        <li className="movie" key={movie.id}>
          <h4>{movie.title}</h4>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={`Poster of the movie '${movie.title}'`} />
        </li>
      ))}
    </ul>
  )
}

function NoMovies () {
  return (
    <p>Movies not found</p>
  )
}

export default function Movies ( { movies } : Props ) {
  const hasMovies = movies.length > 0

  return (
    <>
      {
        hasMovies 
          ? <MoviesList movies={movies}/>
          : <NoMovies />
      }
    </>
  )
}