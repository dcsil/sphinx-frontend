import React from 'react';
import { Flex } from '@chakra-ui/core';
import { Router } from 'react-router-dom';
import { history } from '../utils/history';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from '../../test-utils';
import Header from '../routes/Dashboard/Header';
import Private from '../components/PrivateComponent';

it('Renders the connected PrivateComponent', () => {
  render(
    <ThemeProvider>
      <CSSReset />
      <Router history={history}>
        <Private component={Flex} />
      </Router>
    </ThemeProvider>,
    { initialState: { auth: { userToken: false } } }
  );
  expect(screen).not.toBeUndefined();
});

// it('Renders the connected PrivateComponent', () => {
//   render(
//     <ThemeProvider>
//       <CSSReset />
//       <Router history={history}>
//         <Header path={'/dashboard/analytics'} />
//       </Router>
//     </ThemeProvider>,
//     { logout: () => {} }
//   );
//   expect(screen).not.toBeUndefined();
// });
