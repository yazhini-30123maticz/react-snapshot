import React, { Component ,useState, useEffect } from 'react';

import {
    Route,
    Redirect
  } from 'react-router-dom';

import Login from './user-pages/Login';
import Dashboard from './dashboard/Dashboard.js';



  function adminRoute({ children, isAuth,isAdmin, ...rest  }) {
   
    return (
      <Route
        {...rest}
        render={
          ({ location }) => (
            (isAuth) ? (
              children
            ) : (
             <Login/>
             
            )
            )
        }
      />
    );
  }
  
  export default adminRoute;