import { useEffect, useRef } from "react";

export default function Header({ query, setQuery }) {
  const inputEl = useRef(null); // null for events

  useEffect(function () {
    inputEl.current.focus();
  }, []);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    </>
  );
}
