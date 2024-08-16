import { useEffect, useState } from "react";
import MoviesList from "../components/MoviesList/MoviesList"
import { getTrendingMovies } from "../services/getData";
import { Slide, toast, ToastContainer } from "react-toastify";
import Loader from "../components/Loader/Loader";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await getTrendingMovies();
      setMovies(response.results);
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
    fetchMovies();
  }, []);

  return (
    <>
      <h2 className="title">Trending today</h2>
      {loading && <Loader />}
      <MoviesList movies={movies} />
      <ToastContainer transition={Slide} />
    </>
  );
}

export default HomePage;