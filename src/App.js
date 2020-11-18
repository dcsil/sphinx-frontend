import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './LandingPage';
import PrivateComponent from './components/PrivateComponent';
import Dashboard from './Dashboard';
import Summary from './Dashboard/Summary';
import Anomaly from './Dashboard/Anomaly';
import EventLog from './Dashboard/EventLog';
import Diagram from './Dashboard/Diagram';
import Login from './LoginPage';
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
                <PrivateComponent component={Dashboard} />
                <Route path={`${url}/`} component={Summary} exact />
                <Route
                  exact
                  path={`${url}/event_log`}
                  render={props => (
                    <PrivateComponent {...props} component={EventLog}></PrivateComponent>
                  )}
                />
                <Route
                  exact
                  path={`${url}/anomaly`}
                  render={props => (
                    <PrivateComponent {...props} component={Anomaly}></PrivateComponent>
                  )}
                />
                <Route
                  exact
                  path={`${url}/diagram`}
                  render={props => (
                    <PrivateComponent {...props} component={Diagram}></PrivateComponent>
                  )}
                />
              </>
            )}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
