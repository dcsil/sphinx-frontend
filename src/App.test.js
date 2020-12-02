import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from './App';
import EventLog from './routes/Dashboard/EventLog'
import Logo from './routes/LandingPage/Logo';
import Traffic, { LABELS } from './model/traffic';
import Count from './components/Counting'
import BlockTable from './routes/Dashboard/EventLog/BlockList/Table'
import Map from './routes/Dashboard/Analytics/Diagrams/Map/map'

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

test('Render BlockTable', () => {
  render(<BlockTable blockList={tList.map(t => t.SourceIP)} blockLogs={tList}/>);
  expect(screen).not.toBeUndefined();
});



// test('Render Map', () => {
//   render(<Map data={[{name: 'test', coordinates: [0, 0], color: '#666666'}]}/>);
//   expect(screen).not.toBeUndefined();
// });

// test('Render IPTable', () => {
//   const { getByText } = render(<IPTable logs={tList}/>);
//   const linkElement = getByText(/Parameters/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test('Render IPTable', () => {
//   const { getByText } = render(<Logo />);
//   const linkElement = getByText(/Parameters/i);
//   expect(linkElement).toBeInTheDocument();
// });

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
