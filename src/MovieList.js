export default function MovieList({ movies }) {
  return movies.map((movie) => (
    <div key={movie.imdbID}>
      <img src={movie.Poster} alt="movie.Title" width="50px" />
      <p>{movie.Title}</p>
      <p>{movie.Year}</p>
    </div>
  ));
}
