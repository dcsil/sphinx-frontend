import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateComponent = ({ component: Component, ...rest }) => {
  return rest.userToken ? <Component {...rest} /> : <Redirect to="/login" />;
};

const mapState = state => {
  return state.auth;
};

export default connect(mapState)(PrivateComponent);
