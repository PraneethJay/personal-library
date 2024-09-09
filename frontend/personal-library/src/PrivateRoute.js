// src/PrivateRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  
  return token ? <Route {...rest} element={Component} /> : <Navigate to="/" />;
};

export default PrivateRoute;
