import Dashboard from "../Components/Dashboard";
import Login from "../Components/Login";
import Register from "../Components/Register";

export const routes = [
  {path: '/', Component: <Dashboard />, name: 'Dashboard'},
  {path: '/login', Component: <Login />, name: 'Login'},
  {path: '/login', Component: <Register />, name: 'Register'}
  
]