import React from 'react';
import flow from 'lodash.flow';
import { connect as connectFirebase } from 'react-firebase';
import { connect as connectStore } from 'unistore/react';

import Module from '../../composers/Module';
import getAddObject from '../../utils/getAddObject';
import Search from '../Search';

import Header from './Header';
import Movies from './Movies';
import { viewAsFriend } from '../../actions';

const MoviesContainer = ({ movies, filter, ...rest }) => (
  <Module>
    <Header filter={filter || 'latest'} {...rest} />
    {!rest.viewAsUid && <Search filter={filter || 'latest'} {...rest} />}
    {movies && <Movies filter={filter || 'latest'} movies={movies} {...rest} />}
  </Module>
);

const mapFirebaseToProps = ({ user, viewAsUid, filter }, ref) => {
  const endpoint = `users/${user.uid}/movies`;

  return {
    movies: `users/${viewAsUid || user.uid}/movies/list`,
    add: movie => ref(`${endpoint}/list/${movie.id}`).set(getAddObject(movie)),
    remove: id => ref(`${endpoint}/list/${id}`).remove(),
    archive: id => ref(`${endpoint}/list/${id}/archived`).set(true),
    pin: id => ref(`${endpoint}/list/${id}/pinned`).set(true),
    setFilter: filter => ref(`${endpoint}/settings`).set({ filter })
  };
};

export default flow(
  connectFirebase(mapFirebaseToProps),
  connectStore(['user', 'viewAsUid'])
)(MoviesContainer);
