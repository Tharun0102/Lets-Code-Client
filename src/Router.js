import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Home from './components/Home/Home';
import NewUserHome from './components/newUserHome/NewUserHome';
import Header from './components/Header/Header';
import Auth from './components/Authentication/Auth';


export default function Router() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userDetails);
  const isLogged = user.isLogged;

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("user"));
    if (User) {
      dispatch({
        type: 'SIGN_IN',
        payload: User
      });
    }
  }, []);

  if (isLogged) {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/auth' exact>
            <Redirect to="/" />
          </Route>
          <Route path='/' exact>
            <Home />
          </Route>
          <Redirect to="/auth" />

        </Switch>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' exact>
          <NewUserHome />
        </Route>
        <Route path='/auth' exact>
          <Auth />
        </Route>
        <Route path='/' exact>
          <Home />
        </Route>
        <Redirect to="/auth" />

      </Switch>
    </BrowserRouter>
  );
}
