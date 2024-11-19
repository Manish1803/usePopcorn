import { useState } from "react";
import { useMovies } from "./hooks/useMovie";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

import {
  Search,
  Box,
  ErrorMessage,
  Loader,
  NavBar,
  Main,
  NumResults,
  MovieList,
  MovieDetails,
  WatchedSummary,
  WatchedMoviesList,
} from "./components";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  // const [watched, setWatched] = useState([]);
  // const [watched, setWatched] = useState(() => {
  //   const storedValue = localStorage.getItem("watched");
  //   if (storedValue === null) return [];
  //   return JSON.parse(storedValue);
  // });

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // useEffect(() => {
  //   localStorage.setItem("watched", JSON.stringify(watched));
  // }, [watched]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>

        {/* Explicit props */}
        {/* <Box element={<List />}/> */}
      </Main>
    </>
  );
}
