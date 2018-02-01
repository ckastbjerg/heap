import React from 'react';
import { connect } from 'react-firebase';

import Module, { Title } from '../../composers/Module';

import Search from '../Search';

import Header from './Header';
import Games from './Games';

const GamesContainer = ({ games, filter, ...rest }) => (
  <Module>
    <Header filter={filter || 'latest'} {...rest} />
    <Search filter={filter || 'latest'} {...rest} />
    {games && <Games games={games} filter={filter || 'latest'} {...rest} />}
  </Module>
);

const mapFirebaseToProps = (props, ref) => {
  const endpoint = `users/${window.__uid__}/games`;
  return {
    games: `${endpoint}/list`,
    filter: props.filter || `${endpoint}/settings/filter`,
    add: game => ref(`${endpoint}/list/${game.id}`).set(game),
    remove: id => ref(`${endpoint}/list/${id}`).remove(),
    archive: id => ref(`${endpoint}/list/${id}/archived`).set(true),
    pin: id => ref(`${endpoint}/list/${id}/pinned`).set(true),
    setFilter: filter => ref(`${endpoint}/settings`).set({ filter })
  };
};

export default connect(mapFirebaseToProps)(GamesContainer);
