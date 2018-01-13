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

const mapFirebaseToProps = (props, ref) => ({
  games: 'games/list',
  add: game => ref(`games/list/${game.id}`).set(game),
  remove: id => ref(`games/list/${id}`).remove(),
  archive: id => ref(`games/list/${id}/archived`).set(true),
  pin: id => ref(`games/list/${id}/pinned`).set(true)
});

export default connect(mapFirebaseToProps)(GamesContainer);
