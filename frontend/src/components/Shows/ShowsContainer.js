import React from 'react';
import { connect } from 'react-firebase';
import moment from 'moment';

import Search from '../Search';
import Module from '../../composers/Module';

import Header from './Header';
import Shows from './Shows';

const ShowsContainer = ({ shows, ...rest }) => (
  <Module>
    <Header {...rest} />
    <Search {...rest} />
    {shows && <Shows shows={shows} {...rest} />}
  </Module>
);

const mapFirebaseToProps = (props, ref) => {
  const path = `users/${window.__uid__}/shows/list`;
  return {
    shows: path,
    add: show =>
      ref(`${path}/${show.id}`).set(
        Object.assign({}, show, { dateUpdated: moment().toISOString() })
      ),
    remove: id => ref(`${path}/${id}`).remove(),
    archive: id => ref(`${path}/${id}/latestEpisode/archived`).set(true),
    pin: id => ref(`${path}/${id}/pinned`).set(true)
  };
};

export default connect(mapFirebaseToProps)(ShowsContainer);
