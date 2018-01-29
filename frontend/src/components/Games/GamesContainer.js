import React from 'react';
import { connect } from 'react-firebase';

import Search from '../Search';
import Games from './Games';

import Module, { Title, Header } from '../../composers/Module';

const GamesContainer = ({ games, filter, ...rest }) => (
  <Module>
    <Header>
      <Title>{filter} Games</Title>
    </Header>
    <Search {...rest} />
    {games && <Games games={games} filter={filter} {...rest} />}
  </Module>
);

const mapFirebaseToProps = (props, ref) => {
  const path = `users/${window.__uid__}/games/list`;
  return {
    games: path,
    add: game => ref(`${path}/${game.id}`).set(game),
    remove: id => ref(`${path}/${id}`).remove(),
    archive: id => ref(`${path}/${id}/archived`).set(true),
    pin: id => ref(`${path}/${id}/pinned`).set(true)
  };
};

export default connect(mapFirebaseToProps)(GamesContainer);
