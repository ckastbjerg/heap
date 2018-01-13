import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import media from 'styled-media-query';

import Header from './components/Header';

import Home from './pages/Home';
import TheatricalMovies from './pages/TheatricalMovies';
import DigitalMovies from './pages/DigitalMovies';
import Shows from './pages/Shows';
import Games from './pages/Games';

import { baseSize, headerHeight } from './tokens';

const App = styled.div`
  height: 100%;
  width: 100%;
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

export default () => (
  <Router>
    <App>
      <Header />
      <Content>
        <Route exact path="/" component={Home} />
        <Route exact path="/theatrical-movies" component={TheatricalMovies} />
        <Route exact path="/digital-movies" component={DigitalMovies} />
        <Route exact path="/series" component={Shows} />
        <Route exact path="/games" component={Games} />
      </Content>
    </App>
  </Router>
);
