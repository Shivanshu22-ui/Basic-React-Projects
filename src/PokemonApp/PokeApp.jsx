import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";
import axios from "axios";

export default function PokeApp() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loadings, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results);
        console.log(res.data);
        console.log(pokemon);
      });

    return () => {
      cancel();
    };
  }, [currentPageUrl]);

  function nextPage(){
    setCurrentPageUrl(nextPageUrl);
  }
  function prevPage(){
    setCurrentPageUrl(prevPageUrl);
  }



  if (loadings) return "loading...";
  return (
    <div>
      <PokemonList pokemon={pokemon} />
      <Pagination 
        nextPage={nextPage}
        prevPage={prevPageUrl? prevPage:null}
      />
    </div>
  );
}
