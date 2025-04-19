import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  
  return(
    <Outlet />
  )
}
export default PrivateRoute;