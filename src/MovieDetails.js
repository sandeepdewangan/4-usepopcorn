import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { type } from "@testing-library/user-event/dist/type";

const apiKey = "541ff05e";

export default function MovieDetails({ movieID, setMovieID, setWatchedMovie }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([]);
  const [movie, setMovie] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(
    function () {
      async function fetchMovie() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieID}`
          );
          if (!res.ok) {
            throw new Error("Something went wrong.");
          }
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Something went wrong.");
          }
          setMovie(data);
          setIsLoading(false);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovie();
    },
    [movieID]
  );

  function onAddWatchedHistory() {
    const watchedMovie = {
      ...movie,
      userRating: rating,
    };
    setWatchedMovie((e) => [...e, watchedMovie]);
    setMovieID("");
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && movieID && (
        <div>
          <button onClick={(e) => setMovieID(null)}>Back</button>
          <div>
            <h3>{movie.Title}</h3>
            <p>{movie.Writer}</p>
          </div>
          <StarRating rating={rating} setRating={setRating} />
          <button onClick={() => onAddWatchedHistory(movie)}>
            Add to watched history
          </button>
        </div>
      )}
      {!movieID && <p>Please select an movie</p>}
    </div>
  );
}
