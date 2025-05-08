import React, { useContext, useState } from 'react'
import man from '../assets/images/man.png'
import { MENUITEMS } from '../Menu';
import { Link } from 'react-router-dom';
import { Settings } from 'react-feather';
import AuthContext from '../_helper/AuthContext';
import CustomizerContext from '../_helper/CustomizerContext';

const Sidebar = () => {

  const {role} = useContext(AuthContext);
  const {toggle} = useContext(CustomizerContext);

  const [activePath, setActivePath] = useState('/');

  return (
    <div className={`main-sidebar ${toggle ? 'closed-sidebar' : ''}`}>
      <Link className="setting-primary" to={`/settings`}>
        <Settings />
      </Link>
      <div className="user-wrapper">
        <img src={man} alt="user" className="user-profile" />
        <h4>{JSON.parse(localStorage.getItem('name')) || "User Name"}</h4>
        <h5 style={role == 'Superadmin' ? {color: 'darkred'} : role == 'Admin' ? {color: 'orange'} : {color : 'green'}}>{role || "User"}</h5>
      </div>
      <div className="bar-item-wrapper custom-scrollbar">
        {MENUITEMS.map(item => (
          item.Items.map((menuItem, idx) => (
            <Link
              to={menuItem.path}
              id="nav-link"
              key={idx}
              className={`bar-item ${activePath === menuItem.path ? 'active' : ''}`}
              onClick={() => setActivePath(menuItem.path)}
            >
              {menuItem.icon !== undefined && <menuItem.icon className='icon'/>}
              <span>{menuItem.title}</span>
            </Link>
          ))
        ))}
        {/* <li>
          <a href="index.php" className="bar-item"><img src="../src/images/home.png" className="icon-wrapper" alt="Edit Icon" />Main Page</a>
        </li> */}
      </div>
    </div>
  )
}

export default Sidebar
