import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../../services/getData";
import style from './MovieReviews.module.css';
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      try {
        setLoading(true);
        const castData = await getReviews(movieId);
        setReviews(castData.results);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [movieId]);

  if (reviews.length === 0) {
    return <p className={style.noreviews}>There are no reviews available</p>
  }


  return (
    <div className={style.reviews}>
      {loading && <Loader />}
      {!loading && reviews.map(review => (
        <div key={review.id} className={style.item}>
          <h3 className={style.title}>Author: {review.author}</h3>
          <p className={style.text}>{review.content}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieReviews;