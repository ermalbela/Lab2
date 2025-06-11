import React, { useCallback, useContext, useState, useEffect, useRef } from "react";
import {Navbar, Nav, NavLink, Container, NavbarBrand, NavbarToggle, NavbarCollapse, Button, NavItem, Col} from 'react-bootstrap';
import { routes } from "../Route/routes";
import { Link } from "react-router-dom";
import leftArrow from '../assets/images/left-arrow.png'
import axios from "axios";
import CustomizerContext from "../_helper/CustomizerContext";
import { getMovies, logout } from "../Endpoint";
import AuthContext from "../_helper/AuthContext";
import { Search } from "react-feather";
import ListOfMenu from "./ListOfMenu";


const Header = () => {

  const {toggle, setToggle} = useContext(CustomizerContext);
  const {setRole} = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isFocused, setIsFocused] = useState(false); // to track focus
  const containerRef = useRef(null);

  async function fetchMovies(){
    const response = await axios.get(getMovies, {headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`}, withCredentials: true});
    setMovies(response.data);
    console.log(movies);
  }

  useEffect(() => {
    fetchMovies();
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClick = () => {
    setToggle(!toggle);
  }

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      //Do whatever when esc is pressed
      setSearchValue('');
      setSearchResult([]);
    }
  }, [searchToggle]);

  const addFix = () => {
    setSearchToggle(true);
  };

  const removeFix = useCallback(() => {
        setSearchValue('');
        setSearchToggle(false);
    }, [setSearchToggle]);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction, searchValue]);

  const handleSearchKeyword = (keyword) => {
    keyword ? addFix() : removeFix();
    const items = [];
    setSearchValue(keyword);
    movies.map(movie => {
      if(movie.title.toLowerCase().includes(keyword)){
        items.push(movie);
      }
      setSearchResult(items);
    })
  }

  
  const handleLogout = async () => {
    try {
        const response = await axios.get(logout, { withCredentials: true });
            localStorage.removeItem('name');
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
              localStorage.removeItem('status');
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

        <Col md={6} className="d-flex flex-column align-items-center position-relative" style={{ marginLeft: '1.8rem' }} ref={containerRef}>
          <div className="position-relative w-100">
            <Search size={18} className="search-icon" />
            <input
              type="search"
              value={searchValue}
              name="search"
              className="form-control form-control-lg searchInput ps-5"
              aria-controls="base-style"
              onChange={e => {
                handleSearchKeyword(e.target.value)
                setIsFocused(true);
              }}
              onFocus={() => setIsFocused(true)}
              placeholder="Search here"
            />
            {isFocused && searchValue && (
              <div className="list-of-menu-dropdown">
                <ListOfMenu searchResult={searchResult} setSearchValue={setSearchValue} setSearchToggle={setSearchToggle} />
              </div>
            )}
          </div>
        </Col>

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