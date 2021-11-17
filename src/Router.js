import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home/Home';
import NewUserHome from './components/newUserHome/NewUserHome';
import Auth from './components/Authentication/Auth';
import ProjectHome from './containers/ProjectHome/ProjectHome';


export default function Router() {
  const user = useSelector(state => state.userDetails);
  const isLogged = user.isLogged;

  if (isLogged) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/projects/:projectId' exact>
            <ProjectHome />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <NewUserHome />
        </Route>
        <Route path='/auth/:type' exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}
