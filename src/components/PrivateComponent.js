import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateComponent = ({ component: Component, ...rest }) => {
  // here, don't deconstruct token so that the child can have access
  return rest.userToken ? <Component {...rest} /> : <Redirect to="/login" />;
};

const mapState = state => {
  return state.auth;
};

export default connect(mapState)(PrivateComponent);
