import { useEffect, useState } from "react";
import Search from "./Header";
import MovieList from "./MovieList";
import WatchedList from "./WatchedList";

import PropTypes from "prop-types";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const apiKey = "541ff05e";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("matrix");
  const [error, setError] = useState("");

  // Executed only at first mount
  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
        );
        if (!res.ok) {
          throw new Error("Something went wrong.");
        }
        const data = await res.json();
        setMovies(data.Search);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <Search />

      <h3 style={{ backgroundColor: "yellow" }}>Movies List</h3>
      {/* {isLoading ? <p>Loading...</p> : <MovieList movies={movies} />} */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      {!isLoading && !error && <MovieList movies={movies} />}

      <h3 style={{ backgroundColor: "yellow" }}>Watched List</h3>
      <WatchedList watched={tempWatchedData} />

      {/* Success/Error Message Disply Using Composition */}
      <MessageBox>
        <Success /> {/*or <Failure /> */}
      </MessageBox>
    </>
  );
}

// props.children
function MessageBox({ children }) {
  return <div>{children}</div>;
}

Success.propTypes = {
  message: PropTypes.string,
  successCode: PropTypes.number,
};

function Success({ message, successCode }) {
  return <p>Success Message</p>;
}
