import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import MoviesList from "../components/MoviesList/MoviesList";
import { getData } from "../services/getData";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const MoviesPage = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const query = searchParams.get("query");

  const fetchMovies = async (searchQuery) => {
    try {
      setLoading(true);
      const response = await getData(searchQuery);

      if (!response || !response.results) {
        toast.info("No movies found for your query", {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          theme: "colored",
        });

        setMoviesList([]);
        return;
      }

      setMoviesList(response.results);
    } catch (err) {
        console.log(err);
        return toast.error("Can't load movies at this time", {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          theme: "colored",
        });
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (query) {
      fetchMovies(query);
    } else {
      setMoviesList([]);
    }
  }, [query]);

  const handleSearch = (newQuery) => {
    setSearchParams({ "query" : newQuery });
  };

  const filteredMovies = useMemo(() => moviesList.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase()) && movie.backdrop_path !== null
  ), [moviesList, query]);

  return (
    <>
      <SearchBar defaultSearchValue={query} onSubmit={handleSearch} />
      {loading && <Loader />}
      {!loading && query && filteredMovies.length === 0 && (
        <p className="text">There are no movies that match the query</p>
      )}
      {!loading && filteredMovies.length > 0 && (
        <MoviesList movies={filteredMovies} />
      )}
      <ToastContainer transition={Slide} />
    </>
  )
}

export default MoviesPage;