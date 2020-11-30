import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Flex } from '@chakra-ui/core';
import Header from '../routes/Dashboard/Header';

const PrivateComponent = ({ component: Component, ...rest }) => {
  // here, don't deconstruct token so that the child can have access
  // TODO: change bacl
  return rest.userToken ? (
    <Flex direction="column" align="center" w="100%" m="0 auto">
      <Header {...rest} />
      <Component {...rest} />
      {/* <Footer /> */}
    </Flex>
  ) : (
    <Redirect to="/login" />
  );
};

const mapState = state => {
  return state.auth;
};

export default connect(mapState)(PrivateComponent);
