import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { auth } from '../redux/actions/auth';

function Login({ login, requesting, isLoggedIn }) {
  const { handleSubmit, errors, register } = useForm();
  //   const [isSubmitting, setIsSubmitting] = useState(false);
  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  function validateName(value) {
    let error;
    if (!value) {
      error = 'Username/email and password are required';
    }

    return error || true;
  }

  function onSubmit(values) {
    login(values);
    // setIsSubmitting(true);
    // console.log(values);
    // setIsSubmitting(false);
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   setIsSubmitting(false);
    // }, 1000);
  }

  return (
    <Flex width="full" mt="15%" align="center" justifyContent="center">
      <Box p={8} width="600px" maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.name}>
            <FormLabel htmlFor="username">Username or Email</FormLabel>
            <Input
              name="usernameOrEmail"
              placeholder="Enter username or email"
              ref={register({ validate: validateName })}
            />
            <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              name="password"
              placeholder="password"
              ref={register({ validate: validateName })}
            />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
          <Button mt={4} variantColor="teal" isLoading={requesting} type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

const mapState = state => {
  return state.auth;
};

const actionCreator = {
  login: auth.login,
};

export default connect(mapState, actionCreator)(Login);
