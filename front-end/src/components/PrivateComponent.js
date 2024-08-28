
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = ({ allowedRoles }) => {
  const auth = JSON.parse(localStorage.getItem('user'));

  if (!auth) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.includes(auth.role)) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateComponent;
