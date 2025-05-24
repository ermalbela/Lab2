const userApi = 'http://localhost:5064/api/users/';
export const registerUser = userApi + 'register';
export const loginUser = userApi + 'login';
export const getRole = userApi + 'user-role';
export const logout = userApi + 'logout';

const movieApi = 'http://localhost:5064/api/movies/';
export const getMovies = movieApi + 'get_movies';
export const addMovie = movieApi + 'create_movie';