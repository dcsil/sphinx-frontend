import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Landing from './LandingPage';
import PrivateComponent from './components/PrivateComponent';
import Analytics from './Dashboard/Analytics';
import Cluster from './Dashboard/Cluster';
import EventLog from './Dashboard/EventLog';
import Login from './LoginPage';
import { history } from './utils/history';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import customTheme from './utils/theme';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
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
          <Route exact path="/pricing">
            <Landing />
          </Route>
          <Route exact path="/features">
            <Landing />
          </Route>
          <Route exact path="/how">
            <Landing />
          </Route>

          <Route
            path="/dashboard"
            render={({ match: { url } }) => (
              <>
                {/* <PrivateComponent component={Dashboard}/> */}
                {/* <Route path={`${url}/`} component={Summary} exact /> */}
                <Route
                  exact
                  path={`${url}/analytics`}
                  render={props => (
                    <PrivateComponent
                      {...props}
                      path={`${url}/analytics`}
                      component={Analytics}
                    ></PrivateComponent>
                  )}
                />
                <Route
                  exact
                  path={`${url}/cluster`}
                  render={props => (
                    <PrivateComponent
                      {...props}
                      path={`${url}/cluster`}
                      component={Cluster}
                    ></PrivateComponent>
                  )}
                />
                <Route
                  exact
                  path={`${url}/event_log`}
                  render={props => (
                    <PrivateComponent
                      {...props}
                      path={`${url}/event_log`}
                      component={EventLog}
                    ></PrivateComponent>
                  )}
                />
              </>
            )}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
