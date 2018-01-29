import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import styled from 'styled-components';

import App from './App';
import 'reset-css/reset.css';
import './index.css';

const Button = styled.button`
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
  border: 3px solid rgba(0, 0, 0, 0.05);
  color: white;
  font-size: 5vh;
  height: 12vh;
  text-transform: uppercase;
  letter-spacing: 0.5vw;
  width: 36vh;
  border-radius: 6vh;
  font-family: 'Open Sans', sans-serif;
  font-weight: 900;
  margin-left: calc(50vw - 18vh);
  margin-top: calc(50vh - 6vh);
`;

firebase.initializeApp({
  apiKey: 'AIzaSyDq1qSJxZfeoJKU7L6OTs3IL27fD7I5d4Q',
  authDomain: 'heap-55c3a.firebaseapp.com',
  databaseURL: 'https://heap-55c3a.firebaseio.com',
  projectId: 'heap-55c3a',
  storageBucket: 'heap-55c3a.appspot.com',
  messagingSenderId: '565111563546'
});
const provider = new firebase.auth.GoogleAuthProvider();

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { signedInStatus: undefined };
    this.onAuthChanged = this.onAuthChanged.bind(this);
    this.signIn = this.signIn.bind(this);
  }
  signIn() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        this.onAuthChanged(result.user);
      })
      .catch(error => console.log(error));
  }
  onAuthChanged(user) {
    if (!user) {
      this.setState({ signedInStatus: 'signed-out' });
    } else {
      window.__uid__ = user.uid;
      this.setState({ signedInStatus: 'signed-in' });
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.onAuthChanged);
  }
  render() {
    if (this.state.signedInStatus === 'signed-out') {
      return <Button onClick={this.signIn}>Login</Button>;
    } else if (this.state.signedInStatus === 'signed-in') {
      return <App />;
    }

    return <div>Loading...</div>;
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
