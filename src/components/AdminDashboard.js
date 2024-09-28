import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ResponsiveDrawer from './Responsivedrawer';

const AdminDashboard = () => {
   const navigate = useNavigate();
  useEffect(() => {
    const preventGoBack = () => {
      window.history.pushState(null, null, window.location.href);
    };
    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', preventGoBack);
    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, [navigate]);
  
  return (
    <>
    <ResponsiveDrawer />
    </>
  );
};

export default AdminDashboard;
