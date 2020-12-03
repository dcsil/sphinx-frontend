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
import Login from '../routes/LoginPage';
import Private from '../components/PrivateComponent';
import Logo from '../routes/LandingPage/Logo';
import Traffic, { LABELS } from '../model/traffic';
import IPItem from '../routes/Dashboard/Analytics/IPList/IPItem';
import IPList from '../routes/Dashboard/Analytics/IPList';
import IPHeader from '../routes/Dashboard/Analytics/IPList/IPHeader';
import Modal from '../routes/Dashboard/Cluster/modal';
import DropDown from '../routes/Dashboard/EventLog/dropDown';
import '@testing-library/jest-dom/extend-expect';
import BlockList from '../routes/Dashboard/EventLog/BlockList';
import Flow from '../routes/Dashboard/Analytics/Diagrams/Flow';
import Pie from '../routes/Dashboard/Analytics/Diagrams/Map/pie';
import Monitoring from '../routes/Dashboard/Analytics/Diagrams/Monitoring';
import Control from '../routes/Dashboard/Cluster/control';
import Packet from '../routes/Dashboard/Analytics/Diagrams/Packet';
import AntTable from '../routes/Dashboard/EventLog/table';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../redux/reducers';
import Diagrams from '../routes/Dashboard/Analytics/Diagrams';
import { shallow, mount } from 'enzyme';
import Analytics from '../routes/Dashboard/Analytics'
import Rstore from '../redux/store'

// Component Test
var tList = [];
for (var i = 0; i < 20; i++) {
  tList.push(Traffic.random());
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: null, // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

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

test('Render Modal', () => {
  render(
    <ThemeProvider>
      <CSSReset />
      <Router history={history}>
        <Modal />
      </Router>
    </ThemeProvider>
  );
  expect(screen).not.toBeUndefined();
});

test('Render Modal', () => {
  render(<Logo />);
  expect(screen).not.toBeUndefined();
});

test('Render IPItem', () => {
  render(
    <IPItem
      item={tList[0]}
      selected={true}
      onClick={() => {}}
      handleChange={() => {}}
      checked={true}
    />
  );
  expect(screen).not.toBeUndefined();
});

test('Render IPHeader', () => {
  render(<IPHeader handleChange={() => {}} checked={true} />);
  expect(screen).not.toBeUndefined();
});

test('Render DropDown', () => {
  render(<DropDown handleMenuClick={() => {}} disabled={false} />);
  expect(screen).not.toBeUndefined();
});

test('Render DropDown', () => {
  render(
    <ThemeProvider>
      <CSSReset />
      <Router history={history}>
        <Header />
      </Router>
    </ThemeProvider>
  );
  expect(screen).not.toBeUndefined();
});

test('Render Login', () => {
  render(
    <ThemeProvider>
      <CSSReset />
      <Router history={history}>
        <Login requesting={true} isLoggedIn={true} />
      </Router>
    </ThemeProvider>
  );
  expect(screen).not.toBeUndefined();
});

test('Render Login', () => {
  render(
    <ThemeProvider>
      <CSSReset />
      <Router history={history}>
        <Login requesting={false} isLoggedIn={false} />
      </Router>
    </ThemeProvider>
  );
  expect(screen).not.toBeUndefined();
});

it('Render Control', () => {
  render(
    <Control
      values={[
        { title: 'All', value: 1 },
        { title: '10%', value: 0.1 },
        { title: '30%', value: 0.3 },
        { title: '50%', value: 0.5 },
        { title: '70%', value: 0.7 },
      ]}
      onChange={value => {}}
    />
  );
  expect(screen).not.toBeUndefined();
});

it('Render Flow', () => {
  render(<Flow />, { initialState: { traffic: { logs: tList } } });
  expect(screen).not.toBeUndefined();
});

it('Render Pie', () => {
  render(
    <Pie data={[{ continent: 'a' }, { continent: 'b' }, { continent: 'b' }, { continent: 'c' }]} />,
    { initialState: { traffic: { logs: tList } } }
  );
  expect(screen).not.toBeUndefined();
});

it('Render Monitoring', () => {
  render(<Monitoring />, { initialState: { traffic: { logs: tList } } });
  expect(screen).not.toBeUndefined();
});

it('Render Packet', () => {
  render(<Packet />, { initialState: { traffic: { logs: tList } } });
  expect(screen).not.toBeUndefined();
});

it('Render IpList - no block', () => {
  render(<IPList />, { initialState: { traffic: { logs: tList, blockList: [] } } });
  expect(screen).not.toBeUndefined();
});

it('Render IpList', () => {
  render(<IPList />, {
    initialState: { traffic: { logs: tList, blockList: [tList[0].SourceIP] } },
  });
  expect(screen).not.toBeUndefined();
});

it('Render BlockList', () => {
  render(<BlockList />, {
    initialState: { traffic: { logs: tList, blockList: [tList[0].SourceIP] } },
  });
  expect(screen).not.toBeUndefined();
});

// import Enzyme from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// Enzyme.configure({ adapter: new Adapter() });
// import { shallow } from 'enzyme';
it('renders with AntTable', () => {
  const wrapper = shallow(
    <Provider store={Rstore}>
      <AntTable data={tList} />
    </Provider>
  ); // Rendering
  expect(wrapper).not.toBeUndefined();
});

it('renders with Modal', () => {
  const wrapper = shallow(<Modal />); // Rendering
  expect(wrapper.state('visible')).toBe(false); // The type of the Result component is success
  // The type of the Result component is success
  wrapper.instance().showModal();
  expect(wrapper.state('visible')).toBe(true); // The type of the Result component is success
  wrapper.instance().handleOk();
  wrapper.instance().showModal();
  wrapper.instance().handleCancel();
});

it('renders with Analytics', () => {
  const wrapper = shallow(<Analytics />); // Rendering
  expect(wrapper).not.toBeUndefined(); // The type of the Result component is success
});

it('renders with Diagrams', () => {
  const wrapper = shallow(<Diagrams />); // Rendering
  expect(wrapper).not.toBeUndefined(); // The type of the Result component is success
});

// it('renders with EventLog', () => {
//   let store = createStore(
//     reducer,
//     { auth: { userToken: true }, traffic: { logs: tList, blockList: [tList[0].SourceIP] } },
//     applyMiddleware(thunk)
//   );
//   function provider(props) {
//     return <Provider store={store}>{props.children}</Provider>;
//   }
//   const wrapper = shallow(<EventLog />, {
//     wrappingComponent: provider,
//   });
//   expect(wrapper).not.toBeUndefined();
// });

// it('Render Diagrams', () => {
//   render(
//     <Diagrams />
//   );
//   expect(screen).not.toBeUndefined();
// });

// it('Renders the connected EventLog', () => {
//     render(
//       <ThemeProvider>
//         <CSSReset />
//         <Router history={history}>
//           <EventLog />
//         </Router>
//       </ThemeProvider>,
//       { initialState: { traffic: { logs: [], blockList: [] } } }
//     );
//     expect(screen).not.toBeUndefined();
//   });

// test('renders login', async () => {
//   const { getByText } = await render(
//     <Provider store={store}>
//       <ThemeProvider>
//         <CSSReset />
//         <Login />
//       </ThemeProvider>
//     </Provider>
//   );
//   const text1 = await waitForElement(() => getByText('Username or Email'));
//   const text2 = await waitForElement(() => getByText('Password'));
//   expect(text1).toBeInTheDocument();
//   expect(text2).toBeInTheDocument();
// });
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
