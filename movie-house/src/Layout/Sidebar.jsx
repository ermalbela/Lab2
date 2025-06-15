import React, { useContext, useEffect, useState } from 'react'
import man from '../assets/images/man.png'
import { MENUITEMS } from '../Menu';
import { Link } from 'react-router-dom';
import { Settings } from 'react-feather';
import AuthContext from '../_helper/AuthContext';
import CustomizerContext from '../_helper/CustomizerContext';

const Sidebar = () => {

  const {role} = useContext(AuthContext);
  const {toggle} = useContext(CustomizerContext);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activePath, setActivePath] = useState('/');
  const [status, setStatus] = useState(JSON.parse(localStorage.getItem('status')));

  return (
    <div className={`main-sidebar ${toggle ? 'closed-sidebar' : ''}`}>
      <Link className="setting-primary" to={`/account`}>
        <Settings />
      </Link>
      <div className="user-wrapper">
        <img src={man} alt="user" className="user-profile" />
        <h4>{JSON.parse(localStorage.getItem('name')) || "User Name"}</h4>
        <h5 style={role == 'Superadmin' ? {color: 'darkred'} : role == 'Admin' ? {color: 'orange'} : {color : 'green'}}>{role || "User"}</h5>
          <div className="status-indicator">
            <span className={"status-dot " + status}></span>
            <span className='status-text'>{status}</span>
          </div>
      </div>
      <div className="bar-item-wrapper custom-scrollbar">
        {MENUITEMS.map(item =>
          item.Items.map((menuItem, idx) => {
            if (menuItem.type === 'link') {
              return (
                <Link
                  to={menuItem.path}
                  id="nav-link"
                  key={idx}
                  className={`bar-item ${activePath === menuItem.path ? 'active' : ''}`}
                  onClick={() => setActivePath(menuItem.path)}
                >
                  {menuItem.icon && <menuItem.icon className='icon' />}
                  <span>{menuItem.title}</span>
                </Link>
              );
            } else if (menuItem.type === 'sub' && menuItem.children) {
              const isActive = activePath === menuItem.path;
              const isOpen = openDropdown === menuItem.title;

              return (
                <div key={idx} 
                  id="nav-link" 
                  className={`sub-link bar-item dropdown-toggle ${isActive || isOpen ? 'active dropdown-open' : ''}`}
                  onClick={() => setOpenDropdown(openDropdown === menuItem.title ? null : menuItem.title)}
                  style={{ cursor: 'pointer' }}
                >
                  {menuItem.icon && <menuItem.icon className="icon" />}
                  <span>{menuItem.title}</span>
                    <div className={`dropdown-animated ${isOpen ? 'show' : ''}`}>
                      <div className={`dropdown-menu-custom`}>
                        {menuItem.children.map((child, cIdx) => (
                          <a
                            key={cIdx}
                            id="nav-link"
                            className={`bar-item sub-item d-flex align-items-center m-0 mt-1 ${activePath === child.path ? 'active' : ''}`}
                            onClick={() => {
                              setActivePath(child.path);
                              setOpenDropdown(null);
                            }}
                            style={{ cursor: 'pointer', display: 'block' }}
                          >
                            {child.icon && <child.icon className="icon" />}
                            <span>{child.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                </div>
              );
            }
            return null;
          })
        )}
        {/* <li>
          <a href="index.php" className="bar-item"><img src="../src/images/home.png" className="icon-wrapper" alt="Edit Icon" />Main Page</a>
        </li> */}
      </div>
    </div>
  )
}

export default Sidebar
