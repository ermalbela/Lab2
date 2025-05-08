import Loader from './Loader';
import Header from './Header';
import React from 'react';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import CustomizerContext from '../_helper/CustomizerContext';

const AppLayout = () => {
  const {toggle} = useContext(CustomizerContext);

  return (
      <>
        <Loader />
        <Header />
        <Sidebar />
        <div className={`page-wrapper ${toggle ? 'closed-page-wrapper' : ''}`}>
          <Outlet />
        </div> 
      </>
    );  
};
export default AppLayout;
