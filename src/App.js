import { useEffect, useState } from "react";
import Search from "./Header";
import MovieList from "./MovieList";

import MovieDetails from "./MovieDetails";

const apiKey = "541ff05e";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("matrix");
  const [error, setError] = useState("");
  const [movieID, setMovieID] = useState(null);
  const [watchedMovie, setWatchedMovie] = useState([]);

  console.log(watchedMovie);

  // Executed only at first mount
  useEffect(
    function () {
      // browser specific controller
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error("Something went wrong.");
          }

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Something went wrong.");
          }
          setMovies(data.Search);
          setIsLoading(false);
          setError("");
        } catch (error) {
          if (error.name !== "AbortError") {
            setError(error);
          }
        } finally {
          setIsLoading(false);
        }
      }
      // limiting the search length
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();

      // clean up
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Search query={query} setQuery={setQuery} />

      <h3 style={{ backgroundColor: "yellow" }}>Movies List</h3>
      {/* {isLoading ? <p>Loading...</p> : <MovieList movies={movies} />} */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      {!isLoading && !error && (
        <MovieList movies={movies} setMovieID={setMovieID} />
      )}

      <h3 style={{ backgroundColor: "yellow" }}>Watched List</h3>
      {watchedMovie.length > 0 ? (
        watchedMovie.map((m) => (
          <p style={{ backgroundColor: "grey" }}>
            {m.Title} - {m.userRating}
          </p>
        ))
      ) : (
        <div>No watched history!</div>
      )}

      <MovieDetails
        movieID={movieID}
        setMovieID={setMovieID}
        setWatchedMovie={setWatchedMovie}
      />
    </>
  );
}
