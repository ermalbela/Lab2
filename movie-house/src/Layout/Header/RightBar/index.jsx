import { Fragment, useContext } from "react";
import { Maximize } from "react-feather";
import { Link } from "react-router-dom";
import MoonLight from "./MoonLight";
import { Button, NavLink } from "react-bootstrap";
import AuthContext from "../../../_helper/AuthContext";
import { logout } from "../../../Endpoint";

const Rightbar = () => {
  const {setRole} = useContext(AuthContext);
    
  const handleLogout = async () => {
    try {
      const response = await axios.get(logout, { withCredentials: true });
      localStorage.removeItem("name");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("status");
      setRole("");

      document.cookie = "token=; Max-Age=0; path=/;";
      console.log(response.data);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  function goFull() {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  return (
    <Fragment>
      <div className="nav-right col pull-right right-menu p-0">
        <ul className="simple-list d-flex flex-row nav-menus align-items-center mb-0">
          <li className="right-header-icon-wrapper">
            <Link className="text-dark" onClick={goFull}>
              <Maximize className="maximize"/>
            </Link>
          </li>
          <li className="right-header-icon-wrapper">
            <MoonLight />
          </li>
          <NavLink as="li" to="/">
            <Link as="button" className=" nav-link btn btn-primary logout-button" onClick={handleLogout}>
              Log Out
            </Link>
          </NavLink>
        </ul>
      </div>
    </Fragment>
  );
};

export default Rightbar;
