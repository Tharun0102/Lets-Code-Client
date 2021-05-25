import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Editor from './components/Editor/Editor';
import Header from './components/Header/Header';
import Console from './components/console/Console';
import Home from './components/Home/Home';
import FileList from './containers/FilesList/FilesList';
import Auth from './components/Authentication/Auth';
import NewUserHome from './components/newUserHome/NewUserHome';
import { useSelector } from 'react-redux';

export default function Router() {
  const user = useSelector(state => state.userDetails);
  if (!user.isLogged) {
    return <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Header />
          <NewUserHome />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  }
  return (
    <BrowserRouter>
      {user.isLogged && <h1>LoggedIn</h1>}
      <main>
        <Switch>
          <Route path="/" exact>
            <Header />
            <NewUserHome />
          </Route>
          <Route path="/:userId/home" exact>
            <Header />
            <Home />
          </Route>
          <Route path="/auth" exact>
            <Auth />
          </Route>
          <Route path="/:userId" exact>
            <Header />
            <Home />
          </Route>
          <Route path="/:userId/:collectionId" exact>
            <Header />
            <div className="files-editor-console">
              <FileList />
              <Editor />
              <Console />
            </div>
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </BrowserRouter>
  );
}
