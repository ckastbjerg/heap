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
    <Search {...rest} media={media} />
    {movies && <Movies movies={movies} filter={filter} {...rest} />}
  </Module>
);

const mapFirebaseToProps = (props, ref) => {
  const path = `users/${window.__uid__}/movies/list`;
  return {
    movies: path,
    add: movie => ref(`${path}/${movie.id}`).set(movie),
    remove: id => ref(`${path}/${id}`).remove(),
    archive: id => ref(`${path}/${id}/archived`).set(true),
    pin: id => ref(`${path}/${id}/pinned`).set(true)
  };
};

export default connect(mapFirebaseToProps)(MoviesContainer);
