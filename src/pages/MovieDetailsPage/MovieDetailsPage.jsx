import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import styles from './MovieDetailsPage.module.css';
import { getMovieDetails } from "../../services/getData";
import { SlArrowLeft } from "react-icons/sl";
import classNames from "classnames";

const getItemStyle = ({ isActive }) => 
  classNames(styles.navLink, {
    [styles.isActive]: isActive,
  });

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const goBack = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      try {
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>
  }

  const { title, backdrop_path, overview, genres, vote_average } = movie;
  const imageUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;
  const score = (vote_average * 10).toFixed(0);

  return (
    <div className={styles.wrapper}>
      <Link 
        to={goBack.current} 
        className={styles.goback}
        >
          <SlArrowLeft />
          Go back
      </Link>
      <div className={styles.box}>
        <img src={imageUrl} alt={title} className={styles.img} />
        <div className={styles.descr}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.text}>User Score: {score}%</p>
          <p className={styles.subcat}>Overview</p>
          <p className={styles.text}>{overview}</p>
          <p className={styles.subcat}>Genres</p>
          <ul className={styles.list}>
            {genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.addBox}>
        <h2 className={styles.extra}>Additional information</h2>
        <nav className={styles.nav}>
          <NavLink to="cast" className={getItemStyle}>Cast</NavLink>
          <NavLink to="reviews" className={getItemStyle}>Reviews</NavLink>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;