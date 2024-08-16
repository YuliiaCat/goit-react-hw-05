import { useEffect, useState } from "react";
import { getCast } from "../../services/getData";
import { useParams } from "react-router-dom";
import style from './MovieCast.module.css';
import Loader from "../Loader/Loader";

const MovieCast = () => {
  const [movieCast, setMovieCast] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      try {
        setLoading(true);
        const castData = await getCast(movieId);
        setMovieCast(castData.cast);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [movieId]);

  if (movieCast.length === 0) {
    return <p>There is no information available</p>
  }

  const filteredCast = movieCast.filter(cast => cast.known_for_department === 'Acting' && cast.profile_path !== null && cast.popularity > 25);

  return (
    <div className={style.cast}>
      {loading && <Loader />}
      {!loading && filteredCast.map(cast => (
        <div key={cast.id} className={style.item}>
          <img src={`https://image.tmdb.org/t/p/h632${cast.profile_path}`} alt={cast.name} />
          <div className={style.descr}>
            <h3>{cast.name}</h3>
            <p>Character: {cast.character}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieCast;
