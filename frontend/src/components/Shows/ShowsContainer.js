import React from 'react';
import flow from 'lodash.flow';
import { connect as connectFirebase } from 'react-firebase';
import { connect as connectStore } from 'unistore/react';

import Module from '../../composers/Module';
import getAddObject from '../../utils/getAddObject';

import Search from '../Search';
import Header from './Header';
import Shows from './Shows';

const ShowsContainer = ({ shows, filter, ...rest }) => (
  <Module>
    <Header filter={filter || 'latest'} {...rest} />
    <Search filter={filter || 'latest'} {...rest} />
    {shows && <Shows shows={shows} filter={filter || 'latest'} {...rest} />}
  </Module>
);

const mapFirebaseToProps = ({ user, viewAsUid, filter }, ref) => {
  const endpoint = `users/${user.uid}/shows`;
  return {
    shows: `users/${viewAsUid || user.uid}/shows/list`,
    add: show => ref(`${endpoint}/list/${show.id}`).set(getAddObject(show)),
    remove: id => ref(`${endpoint}/list/${id}`).remove(),
    archive: id =>
      ref(`${endpoint}/list/${id}/latestEpisode/archived`).set(true),
    pin: id => ref(`${endpoint}/list/${id}/pinned`).set(true),
    setFilter: filter => ref(`${endpoint}/settings`).set({ filter })
  };
};

export default flow(
  connectFirebase(mapFirebaseToProps),
  connectStore(['user', 'viewAsUid'])
)(ShowsContainer);
