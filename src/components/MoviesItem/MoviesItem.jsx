import { Link, useLocation } from "react-router-dom";
import style from './MoviesItem.module.css';

const MoviesItem = ({ movie }) => {
  const { id, title, backdrop_path } = movie;
  const imageUrl = `https://image.tmdb.org/t/p/w500${backdrop_path}`;
  const location = useLocation();

  return (
    <>
    <Link state={{ from: location }} to={`/movies/${id}`} className={style.link}>
      <img src={imageUrl} alt={title} className={style.img}/>
      <p className={style.name}>{title}</p>
    </Link>
    </>
  );
}

export default MoviesItem;