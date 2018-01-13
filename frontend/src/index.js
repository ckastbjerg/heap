import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import App from './App';
import 'reset-css/reset.css';
import './index.css';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'heap-55c3a.firebaseapp.com',
  databaseURL: 'https://heap-55c3a.firebaseio.com',
  projectId: 'heap-55c3a',
  storageBucket: 'heap-55c3a.appspot.com',
  messagingSenderId: '565111563546'
});

ReactDOM.render(<App />, document.getElementById('root'));