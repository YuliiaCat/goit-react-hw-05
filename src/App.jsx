import './App.css'
import Navigation from './components/Navigation/Navigation'
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { lazy, Suspense } from "react";
import Loader from './components/Loader/Loader.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const MoviesPage = lazy(() => import('./pages/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage.jsx'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast.jsx'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews.jsx'));

function App() {

  return (
    <>
      <Navigation />
      <main>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="movies" element={<MoviesPage />} />

            <Route path="movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      </main>
    </>
  )
}

export default App
