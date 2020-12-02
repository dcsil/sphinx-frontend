import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import EventLog from './routes/Dashboard/EventLog'
import Logo from './routes/LandingPage/Logo';
import { Provider } from 'react-redux';
import store from './redux/store';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import Traffic, { LABELS } from './model/traffic';
import Count from './components/Counting'
import IPTable from './components/IPTable'
import '@testing-library/jest-dom/extend-expect';

test('Render landing', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Try Sphinx/i);
  expect(linkElement).toBeInTheDocument();
});

// Component Test
var tList = [];
for (var i = 0; i < 20; i++) {
  tList.push(Traffic.random());
}
test('Render Count', () => {
  const { getByText } = render(<Count><span>test</span></Count>);
  const linkElement = getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render IPTable', () => {
  const { getByText } = render(<IPTable logs={tList}/>);
  const linkElement = getByText(/Parameters/i);
  expect(linkElement).toBeInTheDocument();
});

test('Render Logo', () => {
  const { getByAltText } = render(<Logo />);
  const linkElement = getByAltText(/landing-logo/i);
  expect(linkElement).toBeInTheDocument();
});

// test('Render EventLog', () => {
//   const { getByText } = render(<EventLog />);
//   const linkElement = getByText(/DoH/i);
//   expect(linkElement).toBeInTheDocument();
// });

//

// test('renders login', async () => {
//   // await act(async () => {
//   //   const { getByText } = render(
//   //     <Provider store={store}>
//   //       <ThemeProvider theme={customTheme}>
//   //         <CSSReset />
//   //         <Login />
//   //       </ThemeProvider>
//   //     </Provider>
//   //   );
//   //   const linkElement = getByText(/Email/i);
//   //   expect(linkElement).toBeInTheDocument();
//   // });

//   const { getByText } = await render(
//     <Provider store={store}>
//       <ThemeProvider theme={customTheme}>
//         <CSSReset />
//         <Login />
//       </ThemeProvider>
//     </Provider>
//   );
//   const text = await waitForElement(() => getByText('Username or Email'));
//   expect(text).toBeInTheDocument();
// });
