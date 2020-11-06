import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, userToken, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (userToken ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};

const mapState = state => {
  return state.auth;
};

export default connect(mapState)(PrivateRoute);
