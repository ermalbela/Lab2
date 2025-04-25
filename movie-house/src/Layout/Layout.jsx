import Loader from './Loader';
import Header from './Header';
import React from 'react';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = () => {
  
  return (
      <>
        <Loader />
        <Header />
        <Sidebar />
        <div className='page-wrapper'>
          <Outlet />
        </div> 
      </>
    );  
};
export default AppLayout;
