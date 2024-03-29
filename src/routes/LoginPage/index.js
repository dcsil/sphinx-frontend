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
import { auth } from '../../redux/actions/auth';

function Login({ login, requesting, isLoggedIn }) {
  const { handleSubmit, errors, register } = useForm();
  //   const [isSubmitting, setIsSubmitting] = useState(false);
  if (isLoggedIn) {
    return <Redirect to="/dashboard/analytics" />;
  }

  function validateName(value) {
    let error;
    if (!value) error = 'Username/email and password are required';
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

  function renderForm() {
    return Array(2)
      .fill(0)
      .map((_, i) => (
        <FormControl key={i.toString()} isInvalid={i === 0 ? errors.name : errors.password}>
          <FormLabel htmlFor={i === 0 ? 'username' : 'password'}>
            {i === 0 ? 'Username or Email' : 'Password'}
          </FormLabel>
          <Input
            name={i === 0 ? 'usernameOrEmail' : 'password'}
            placeholder={i === 0 ? 'Enter username or email' : 'password'}
            ref={register({ validate: validateName })}
          />
          <FormErrorMessage>
            {i === 0
              ? errors.name && errors.name.message
              : errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
      ))
      .flat(Infinity);
  }

  return (
    <Flex data-testid="login" width="full" mt="15%" align="center" justifyContent="center">
      <Box p={8} width="600px" maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderForm()}
          <Button
            mt={4}
            color={['primary.500', 'primary.500', 'white', 'white']}
            bg={['white', 'white', 'primary.500', 'primary.500']}
            _hover={{
              bg: ['primary.100', 'primary.100', 'primary.600', 'primary.600'],
            }}
            isLoading={requesting}
            type="submit"
          >
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
