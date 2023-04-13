import React, { useState, useRef, useCallback } from "react";
import useBookSearch from "./useBookSearch";

export default function InfinityScrollApp() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const observe = useRef();

  const { loading, error, hasMore, books } = useBookSearch(query, pageNumber);
  const lastBookref = useCallback(
    (node) => {
      if (loading) return;
      if (observe.current) observe.current.disconnect();
      observe.current = new IntersectionObserver((entries) => {
        console.log(entries[0]);
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observe.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(event) {
    setQuery(event.target.value);
    setPageNumber(1);
  }

  return (
    <div>
        <h1>Welcome</h1>
      <input type="text" value={query} onChange={handleSearch} />
      <p>Search any text</p>
      {books.map((book, index) => {
        if (books.length == index + 1) {
          return (
            <div ref={lastBookref} key={book}>
              {book}
            </div>
          );
        } else {
          return <div key={book}>{book}</div>;
        }
      })}
      <div>{(loading && !error)&& "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
}
