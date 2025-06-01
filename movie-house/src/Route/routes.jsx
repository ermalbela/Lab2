import Dashboard from "../Components/Dashboard";
import Favorites from "../Components/Favorites";
import Login from "../Components/Login";
import MovieWatcher from "../Components/MovieWatcher";
import Register from "../Components/Register";

export const routes = [
  {path: '/', Component: <Dashboard />, name: 'Dashboard'},
  {path: '/login', Component: <Login />, name: 'Login'},
  {path: '/login', Component: <Register />, name: 'Register'},
  {path: '/movie_watcher', Component: <MovieWatcher />, name: 'MovieWatcher'},
  {path: '/favorites', Component: <Favorites />, name: 'Favorites'},
  
]