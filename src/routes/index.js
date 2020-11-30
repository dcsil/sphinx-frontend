import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Landing from './LandingPage';
import PrivateComponent from '../components/PrivateComponent';
import Analytics from './Dashboard/Analytics';
import Cluster from './Dashboard/Cluster';
import EventLog from './Dashboard/EventLog';
import Login from './LoginPage';
import { history } from '../utils/history';
import 'bootstrap/dist/css/bootstrap.min.css';

const ROUTE = [
  {
    path: '/analytics',
    component: Analytics,
  },
  {
    path: '/cluster',
    component: Cluster,
  },
  {
    path: '/event_log',
    component: EventLog,
  },
];

const AppRoute = () => {
  return (
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
              {ROUTE.map(r => (
                <Route
                  key={r.path}
                  exact
                  path={url + r.path}
                  render={props => (
                    <PrivateComponent
                      {...props}
                      path={url + r.path}
                      component={r.component}
                    ></PrivateComponent>
                  )}
                />
              )).flat(Infinity)}
            </>
          )}
        />
      </Switch>
    </Router>
  );
};

export default AppRoute;
