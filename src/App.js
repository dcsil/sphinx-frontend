import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
  Redirect,
} from 'react-router-dom';

import { FlaskTestButton } from './components/flask';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { Login } from './LoginPage';

function App() {
  return (
    <Router>
      <Navbar />

      {/* <header className="App-header">
        <img src={require('./image/sphinx_icon.png')} className="App-logo" alt="logo" />
        <FlaskTestButton />
      </header> */}

      <Switch>
        <Route exact path="/"></Route>
        <Route exact path="/public"></Route>
        <PrivateRoute exact path="/private" component={FlaskTestButton} />
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
