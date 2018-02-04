import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import createStore from 'unistore';
import { Provider, connect } from 'unistore/react';
import { onAuthChanged } from './actions';
import initFirebase from './firebase';

import 'reset-css/reset.css';
import './index.css';

import Root from './Root';

const store = createStore({ user: null });
const ConnectedRoot = connect('user', { onAuthChanged })(Root);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRoot />
  </Provider>,
  document.getElementById('root')
);
