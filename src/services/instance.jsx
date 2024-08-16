import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDZhNjMyOGQyMmFkMWY3YmFjODJmMzk4OGRlOTRhYiIsIm5iZiI6MTcyMzczNzUxMy41MTE2MTMsInN1YiI6IjY2YmUyNGYwNWJmNjhjMDkwYTliN2Y4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kuR1e0gHcbzy367ygaPHHUhX7wPqlh9lOwtRsqorku8'}
});

export default instance;