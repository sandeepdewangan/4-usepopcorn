export default function MovieDetails({ movieID, setMovieID }) {
  return (
    <div>
      {movieID ? (
        <div>
          <button onClick={(e) => setMovieID(null)}>Back</button>
          <p>{movieID}</p>
        </div>
      ) : (
        <p>Please select an movie</p>
      )}
    </div>
  );
}
