import React from 'react';
import Nav from 'react-bootstrap/Nav';

function Navbar(props) {
  return (
    <Nav className="justify-content-end" activeKey="/" bg="dark">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" href="/public">
          public
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" href="/private">
          private
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" href="/login">
          Login
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
