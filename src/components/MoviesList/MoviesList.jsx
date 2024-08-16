import style from './MoviesList.module.css';
import MoviesItem from '../MoviesItem/MoviesItem';

const MoviesList = ({ movies }) => {
  return (
    <div className={style.box}>
      <ul className={style.list}>
        {movies.map(movie => (
          <li key={movie.id} className={style.card}>
            <MoviesItem movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoviesList;