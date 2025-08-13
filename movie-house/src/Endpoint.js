const userApi = 'http://localhost:5064/api/users/';
export const registerUser = userApi + 'register';
export const loginUser = userApi + 'login';
export const getRole = userApi + 'user-role';
export const logout = userApi + 'logout';
export const getFavorites = userApi + 'favorites/';
export const toggleFavoriteApi = userApi + 'toggle_favorite';
export const getAllFavorites = userApi + 'get_all_favorites/';

const movieApi = 'http://localhost:5064/api/movies/';
export const getMovies = movieApi + 'get_movies';
export const addMovie = movieApi + 'create_movie';
export const getFilteredMovies = movieApi + 'filter_movies?';

const commentApi = 'http://localhost:5064/api/comments/';
export const addComment = commentApi + 'add_comment';
export const getComments = commentApi + 'get_comments/'

const profileApi = 'http://localhost:5064/api/profile/';
export const getProfile = profileApi;
export const updateProfile = profileApi;