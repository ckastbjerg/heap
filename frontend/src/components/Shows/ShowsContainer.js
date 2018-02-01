import React from 'react';
import { connect } from 'react-firebase';
import moment from 'moment';

import Search from '../Search';
import Module from '../../composers/Module';

import Header from './Header';
import Shows from './Shows';

const ShowsContainer = ({ shows, filter, ...rest }) => (
  <Module>
    <Header filter={filter || 'latest'} {...rest} />
    <Search filter={filter || 'latest'} {...rest} />
    {shows && <Shows shows={shows} filter={filter || 'latest'} {...rest} />}
  </Module>
);

const mapFirebaseToProps = (props, ref) => {
  const endpoint = `users/${window.__uid__}/shows`;
  return {
    shows: `${endpoint}/list`,
    filter: props.filter || `${endpoint}/settings/filter`,
    add: show =>
      ref(`${endpoint}/list/${show.id}`).set(
        Object.assign({}, show, { dateUpdated: moment().toISOString() })
      ),
    remove: id => ref(`${endpoint}/list/${id}`).remove(),
    archive: id =>
      ref(`${endpoint}/list/${id}/latestEpisode/archived`).set(true),
    pin: id => ref(`${endpoint}/list/${id}/pinned`).set(true),
    setFilter: filter => ref(`${endpoint}/settings`).set({ filter })
  };
};

export default connect(mapFirebaseToProps)(ShowsContainer);
