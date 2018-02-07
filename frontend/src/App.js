import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect as connectStore } from 'unistore/react';
import styled from 'styled-components';
import media from 'styled-media-query';

import Header from './components/Header';
import Menu from './components/Menu';

import Home from './pages/Home';
import TheatricalMovies from './pages/TheatricalMovies';
import DigitalMovies from './pages/DigitalMovies';
import Shows from './pages/Shows';
import Games from './pages/Games';

import { baseSize, headerHeight } from './tokens';

const AppWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const AppMenu = styled.div`
  position: absolute;
  bottom: -1px;
  height: calc(100% - ${headerHeight}px);
  overflow: scroll;
  right: -270px;
  width: 270px;
  display: flex;
  z-index: 1;
  transform: ${props => (props.isMenuOpen ? 'translateX(-270px)' : 'none')};
  transition: transform 250ms;

  &::before {
    content: '';
    width: 100vw;
    height: calc(100vh - ${headerHeight}px);
    background: linear-gradient(to right, #1cd8d2, #93edc7);
    left: calc(270px - 100vw);
    position: absolute;
    bottom: 0;
  }
`;

const Content = styled.div`
  height: calc(100% - ${headerHeight}px);
  display: flex;
  flex-direction: column;

  ${media.greaterThan('medium')`
    padding: ${baseSize}px;
	  display: flex;
  `};
`;

const App = props => (
  <Router>
    <AppWrapper>
      <Header />
      <Content>
        <Route exact path="/" component={Home} />
        <Route exact path="/theatrical-movies" component={TheatricalMovies} />
        <Route exact path="/digital-movies" component={DigitalMovies} />
        <Route exact path="/series" component={Shows} />
        <Route exact path="/games" component={Games} />
      </Content>
      <AppMenu {...props}>
        <Menu />
      </AppMenu>
    </AppWrapper>
  </Router>
);

export default connectStore('isMenuOpen')(App);
