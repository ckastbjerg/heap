import React from 'react';
import flow from 'lodash.flow';
import { connect as connectFirebase } from 'react-firebase';
import { connect as connectStore } from 'unistore/react';

import getAddObject from '../../utils/getAddObject';
import Module, { Title } from '../../composers/Module';
import Search from '../Search';

import Header from './Header';
import Games from './Games';

const GamesContainer = ({ games, filter, ...rest }) => (
  <Module>
    <Header filter={filter || 'latest'} {...rest} />
    {!rest.viewAsUid && <Search filter={filter || 'latest'} {...rest} />}
    {games && <Games games={games} filter={filter || 'latest'} {...rest} />}
  </Module>
);

const mapFirebaseToProps = ({ user, viewAsUid, filter }, ref) => {
  const endpoint = `users/${user.uid}/games`;
  return {
    games: `users/${viewAsUid || user.uid}/games/list`,
    add: game => ref(`${endpoint}/list/${game.id}`).set(getAddObject(game)),
    remove: id => ref(`${endpoint}/list/${id}`).remove(),
    archive: id => ref(`${endpoint}/list/${id}/archived`).set(true),
    pin: id => ref(`${endpoint}/list/${id}/pinned`).set(true),
    setFilter: filter => ref(`${endpoint}/settings`).set({ filter })
  };
};

export default flow(
  connectFirebase(mapFirebaseToProps),
  connectStore(['user', 'viewAsUid'])
)(GamesContainer);
