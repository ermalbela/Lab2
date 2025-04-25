import React from 'react'
import man from '../assets/images/man.png'
import { MENUITEMS } from '../Menu';
import { Link } from 'react-router-dom';
import { Settings } from 'react-feather';

const Sidebar = () => {

  const toggletNavActive = (item) => {

    if (!item.active) {
      MENUITEMS.map((a) => {
        a.Items.filter((Items) => {
          if (a.Items.includes(item)) Items.active = false;
          if (!Items.children) return false;
          Items.children.forEach((b) => {
            if (Items.children.includes(item)) {
              b.active = false;
            }
            if (!b.children) return false;
            b.children.forEach((c) => {
              if (b.children.includes(item)) {
                c.active = false;
              }
            });
          });
          return Items;
        });
        return a;
      });
    }
    item.active = !item.active;
  };

  return (
    <div className="main-sidebar">
      <Link className="setting-primary" to={`/settings`}>
        <Settings />
      </Link>
      <div className="user-wrapper">
        <img src={man} alt="user" className="user-profile" />
        <h4>User Name</h4>
        <h5 style={{color: 'green'}}>User</h5>
      </div>
      <div className="bar-item-wrapper custom-scrollbar">
        {MENUITEMS.map(item => (
          item.Items.map((menuItem, idx) => (
            <Link
              to={menuItem.path}
              id="nav-link"
              key={idx}
              className={`bar-item ${menuItem.active ? 'active' : ''}`}
              onClick={() => toggletNavActive(menuItem)}
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
