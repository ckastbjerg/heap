import React from 'react';
import { connect } from 'react-firebase';

import Module, { Header, Title } from '../../composers/Module';
import Search from '../Search';

import Movies from './Movies';

const MoviesContainer = ({ movies, filter, media, ...rest }) => (
  <Module>
    <Header>
      <Title>
        {filter} {media}
      </Title>
    </Header>
    <Search {...rest} />
    {movies && <Movies movies={movies} filter={filter} {...rest} />}
  </Module>
);

const mapFirebaseToProps = (props, ref) => ({
  movies: 'movies/list',
  add: movie => ref(`movies/list/${movie.id}`).set(movie),
  remove: id => ref(`movies/list/${id}`).remove(),
  archive: id => ref(`movies/list/${id}/archived`).set(true),
  pin: id => ref(`movies/list/${id}/pinned`).set(true)
});

export default connect(mapFirebaseToProps)(MoviesContainer);
