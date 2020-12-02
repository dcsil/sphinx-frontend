import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import Login from './routes/LoginPage';
import { Provider } from 'react-redux';
import store from './redux/store';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import customTheme from './utils/theme';
import '@testing-library/jest-dom/extend-expect';

test('renders landing', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Try Sphinx/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders login', async () => {
  const { getByText } = await render(
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <Login />
      </ThemeProvider>
    </Provider>
  );
  const text1 = await waitForElement(() => getByText('Username or Email'));
  const text2 = await waitForElement(() => getByText('Password'));
  expect(text1).toBeInTheDocument();
  expect(text2).toBeInTheDocument();
});
