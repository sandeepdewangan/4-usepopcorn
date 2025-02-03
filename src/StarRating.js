import { useState } from "react";

export default function StarRating({ maxRating }) {
  const [rating, setRating] = useState(maxRating);
  const [tempRating, setTempRating] = useState(0);
  const [clicked, setClicked] = useState(false);

  function onRate(index) {
    setClicked(() => true);
    setRating(() => index);
  }
  function onHover(index) {
    setTempRating(() => index);
  }
  function onLeave() {
    setTempRating(() => 0);
  }
  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex" }}>
        {Array.from({ length: 5 }, (value, index) =>
          clicked ? (
            <svg
              key={index}
              onClick={() => onRate(index + 1)}
              onMouseEnter={() => onHover(index + 1)}
              onMouseLeave={onLeave}
              width="25"
              height="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12.5"
                cy="12.5"
                r="10"
                fill={rating > index ? "red" : "grey"}
              />
            </svg>
          ) : (
            <svg
              key={index}
              onClick={() => onRate(index + 1)}
              onMouseEnter={() => onHover(index + 1)}
              onMouseLeave={onLeave}
              width="25"
              height="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12.5"
                cy="12.5"
                r="10"
                fill={tempRating > index ? "red" : "grey"}
              />
            </svg>
          )
        )}
      </div>
      <p>{rating}</p>
    </div>
  );
}
