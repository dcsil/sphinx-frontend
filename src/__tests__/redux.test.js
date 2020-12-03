import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect'; // You can use any testing library
import { login, logout } from '../redux/actions/auth';
import { traffic } from '../redux/actions/traffic';
import * as AUTH from '../redux/constant/actionTypes';
import * as TRAFFIC from '../redux/constant/trafficActionTypes';
import auth_reducer from '../redux/reducers/auth';
import traffic_reducer from '../redux/reducers/traffic';
import { NODE_SERVER, AI_URL } from '../utils/endpoints';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Redux actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('auth login', async () => {
    fetchMock.post(
      `${NODE_SERVER}/login`,
      {
        data: { token: true },
      },
      {
        delay: 1,
        headers: { 'content-type': 'application/json' },
      },
      true
    );

    const expectedActions = [
      { type: AUTH.LOGIN_REQUEST },
      //   { type: AUTH.LOGIN_SUCCESS, payload: true },
    ];
    const store = mockStore({
      userToken: undefined,
    });

    store.dispatch(login(true));

    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('auth logout', async () => {
    const expectedActions = [{ type: AUTH.LOGIN_OUT }];
    const store = mockStore({
      userToken: undefined,
    });

    store.dispatch(logout());
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('traffic update_label', async () => {
    const expectedActions = [{ type: TRAFFIC.UPDATE_LABEL, id: 0, label: 0 }];
    const store = mockStore({});

    store.dispatch(traffic.update_label(0, 0));
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('traffic blocklist_add', async () => {
    const expectedActions = [{ type: TRAFFIC.BLOCK_ADD, ip: 0 }];
    const store = mockStore({});

    store.dispatch(traffic.blocklist_add(0));
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('traffic blocklist_remove', async () => {
    const expectedActions = [{ type: TRAFFIC.BLOCK_REMOVE, ip: 0 }];
    const store = mockStore({});

    store.dispatch(traffic.blocklist_remove(0));
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('traffic update_traffic', async () => {
    fetchMock.post(
      `${NODE_SERVER}/traffic?startTime=0&endTime=10`,
      {
        data: [0],
      },
      {
        delay: 1,
        headers: { 'content-type': 'application/json' },
      },
      true
    );
    fetchMock.post(
      `${AI_URL}/predict`,
      {
        data: [0],
      },
      {
        delay: 1,
        headers: { 'content-type': 'application/json' },
      },
      true
    );
    const expectedActions = [];
    const store = mockStore({});

    await traffic.update_traffic(0, 10);
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('Redux reducer', () => {
  it('should return the initial state', () => {
    expect(auth_reducer(undefined, {})).toEqual({ userToken: null });
  });
  it('should return the initial state', () => {
    expect(traffic_reducer(undefined, {})).toEqual({ logs: [], blockList: [] });
  });

  it('should handle auth', () => {
    expect(auth_reducer({ userToken: null }, { type: AUTH.LOGIN_REQUEST })).toEqual({
      requesting: true,
      error: null,
      isLoggedIn: false,
    });

    expect(auth_reducer({ userToken: null }, { type: AUTH.LOGIN_SUCCESS, payload: true })).toEqual({
      userToken: true,
      requesting: false,
      isLoggedIn: true,
    });

    expect(auth_reducer({ userToken: null }, { type: AUTH.LOGIN_OUT })).toEqual({
      userToken: null,
      isLoggedIn: false,
    });
  });

  it('should handle traffic', () => {
    expect(
      traffic_reducer({ logs: [], blockList: [] }, { type: TRAFFIC.GENERATE_RANDOM, log: 0 })
    ).toEqual({ logs: [0], blockList: [] });

    expect(
      traffic_reducer(
        { logs: [{ id: 0 }], blockList: [] },
        { type: TRAFFIC.UPDATE_TRAFFIC, log: { id: 1 } }
      )
    ).toEqual({ logs: [{ id: 0 }, { id: 1 }], blockList: [] });

    expect(
      traffic_reducer(
        { logs: [{ id: 0, label: 0 }], blockList: [] },
        { type: TRAFFIC.UPDATE_LABEL, id: 0, label: 1 }
      )
    ).toEqual({ logs: [{ id: 0, label: 1 }], blockList: [] });

    expect(
      traffic_reducer({ logs: [], blockList: [0] }, { type: TRAFFIC.BLOCK_ADD, ip: 1 })
    ).toEqual({ logs: [], blockList: [0, 1] });
    expect(
      traffic_reducer({ logs: [], blockList: [0] }, { type: TRAFFIC.BLOCK_REMOVE, ip: 0 })
    ).toEqual({ logs: [], blockList: [] });
  });

});
