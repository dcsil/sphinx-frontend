import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dummy from './Dummy';
import Landing from './LandingPage';

import Login from './LoginPage';
import TestComp from './TestComp';
import { history } from './utils/history';

import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import customTheme from './utils/theme';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>

          <Route
            path="/dashboard"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={TestComp} exact />
                <Route path={`${url}/test`} component={TestComp} exact />
                <Route path={`${url}/dummy`} component={Dummy} />
              </>
            )}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
