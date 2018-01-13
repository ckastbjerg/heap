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

const mapFirebaseToProps = (props, ref) => ({
  shows: 'shows/list',
  add: show =>
    ref(`shows/list/${show.id}`).set(
      Object.assign({}, show, { dateUpdated: moment().toISOString() })
    ),
  remove: id => ref(`shows/list/${id}`).remove(),
  archive: id => ref(`shows/list/${id}/latestEpisode/archived`).set(true),
  pin: id => ref(`shows/list/${id}/pinned`).set(true)
});

export default connect(mapFirebaseToProps)(ShowsContainer);
