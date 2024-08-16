import { Route, Routes, BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx';
import { lazy, Suspense } from "react";
import Loader from './components/Loader/Loader.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const MoviesPage = lazy(() => import('./pages/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage.jsx'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast.jsx'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews.jsx'));

const Root = () => (
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="movies" element={<MoviesPage />} />

          <Route path="movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

        <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default Root;