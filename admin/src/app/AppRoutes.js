import React, { Component, Suspense, lazy, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';



import AdminRoute from './adminRoutes';

import Routes from './commonRoutes';

import Spinner from '../app/shared/Spinner';

export default function AppRoutes(props) {

  var token = localStorage.getItem("token");
  // console.log("token",token);

  // console.log("token in app routes", token, localStorage.getItem("token"))
  const isAuthenticated = token ? true : false
  const adminRoutes = Routes.map(({ path, component, name }, key) => <Route exact path={path} component={component} key={key} name={name} />)



  return (
    <>
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <AdminRoute
            isAuth={isAuthenticated}>
            {adminRoutes}
          </AdminRoute>
        </Switch>
      </Suspense>
    </>
  );

}


