import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { auth } from '../redux/actions/auth';

function Login({ login }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const handleUsernameChange = ({ target: { value } }) => setUsername(value);
  const handlePasswordChange = ({ target: { value } }) => setPassword(value);
  const handleSubmit = event => {
    event.preventDefault();
    login({ usernameOrEmail: username, password });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email or Username</Form.Label>
          <Form.Control
            size="lg"
            // type="email"
            name="usernameOrEmail"
            placeholder="Enter your email or username"
            onChange={handleUsernameChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            size="lg"
            name="password"
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

const actionCreator = {
  login: auth.login,
};

export default connect(null, actionCreator)(Login);
