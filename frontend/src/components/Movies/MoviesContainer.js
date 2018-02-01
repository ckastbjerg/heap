import React from 'react';
import { connect } from 'react-firebase';

import Module from '../../composers/Module';
import Search from '../Search';

import Header from './Header';
import Movies from './Movies';

const MoviesContainer = ({ movies, filter, ...rest }) => (
  <Module>
    <Header filter={filter || 'latest'} {...rest} />
    <Search filter={filter || 'latest'} {...rest} />
    {movies && <Movies filter={filter || 'latest'} movies={movies} {...rest} />}
  </Module>
);

const mapFirebaseToProps = (props, ref) => {
  const endpoint = `users/${window.__uid__}/movies`;
  return {
    movies: `${endpoint}/list`,
    filter: props.filter || `${endpoint}/settings/filter`,
    add: movie => ref(`${endpoint}/list/${movie.id}`).set(movie),
    remove: id => ref(`${endpoint}/list/${id}`).remove(),
    archive: id => ref(`${endpoint}/list/${id}/archived`).set(true),
    pin: id => ref(`${endpoint}/list/${id}/pinned`).set(true),
    setFilter: filter => ref(`${endpoint}/settings`).set({ filter })
  };
};

export default connect(mapFirebaseToProps)(MoviesContainer);
