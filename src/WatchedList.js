import StarRating from "./StarRating";

export default function WatchedList({ watched }) {
  return watched.map((movie) => (
    <div>
      <img src={movie.Poster} alt="movie.Title" width="50px" />
      <p>{movie.Title}</p>
      <p>
        {movie.imdbRating}, {movie.userRating}, {movie.runtime} min
      </p>
      <StarRating maxRating={movie.userRating} />
    </div>
  ));
}
