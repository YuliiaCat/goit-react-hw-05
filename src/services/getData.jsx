import instance from "./instance";

const fetchData = async (url, errorMessage) => {
  try {
    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    console.error(errorMessage, error);
    throw error;
  }
};

export const getData = async (query) => {
  if (!query) {
    return;
  }

  const searchParams = new URLSearchParams({
    query,
  });

  return fetchData(`/search/movie?${searchParams.toString()}`, "Error fetching data");
}

export const getTrendingMovies = () => fetchData('/trending/movie/day', "Error fetching movies");

export const getMovieDetails = (movieId) => fetchData(`/movie/${movieId}`, "Error fetching movie details");

export const getCast = (movieId) => fetchData(`/movie/${movieId}/credits`, "Error fetching credits");

export const getReviews = (movieId) => fetchData(`/movie/${movieId}/reviews`, "Error fetching reviews");
