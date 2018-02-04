import React from 'react';
import styled from 'styled-components';

import initFirebase, { signIn } from './firebase';

import App from './App';

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

const Root = class extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    initFirebase(this.props.onAuthChanged);
  }
  render() {
    const { user } = this.props;
    return user ? <App /> : <Button onClick={signIn}>Login</Button>;
  }
};

export default Root;
