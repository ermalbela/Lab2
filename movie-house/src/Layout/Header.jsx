import React, { useContext } from "react";
import {Navbar, Nav, NavLink, Container, NavbarBrand, NavbarToggle, NavbarCollapse, Button, NavItem} from 'react-bootstrap';
import { routes } from "../Route/routes";
import { Link } from "react-router-dom";
import leftArrow from '../assets/images/left-arrow.png'
import axios from "axios";
import CustomizerContext from "../_helper/CustomizerContext";
import { logout } from "../Endpoint";
import AuthContext from "../_helper/AuthContext";


const Header = () => {

  const {toggle, setToggle} = useContext(CustomizerContext);

  const handleClick = () => {
    setToggle(!toggle);
  }

  const {setRole} = useContext(AuthContext);

  const handleLogout = async () => {
    try {
        const response = await axios.get(logout, { withCredentials: true });
            localStorage.removeItem('name');
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
            setRole('');

            document.cookie = "token=; Max-Age=0; path=/;";            
            console.log(response.data);
      } catch (error) {
        console.error('Error logging out:', error);
    }
};

  return(
    <Navbar variant="pills" expand="lg" fixed="top" className="navbar ">
      <Container>
        <NavbarBrand><Link className="nav-link" to='/'>Movie House</Link></NavbarBrand>
        <div className="toggle-wrapper" onClick={handleClick}>
          <img src={leftArrow} alt="arrow" className={`toggle ${toggle ? 'closed-icon' : ''}`} />
        </div>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="ms-auto justify-content-center align-items-center">
            {routes.filter(route => route.show).map(({path, name}, i) => (
              <NavLink as='div' key={i}>
                <Link className="nav-link" to={path}>{name}</Link>
              </NavLink>
            ))}
            <NavLink as="div" to='/'>
              <Link as='button' className=" nav-link btn btn-primary logout-button" onClick={handleLogout}>
                Log Out
              </Link>
            </NavLink>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  )
}

export default Header;