import React, { Component } from 'react';
import { postData } from '../../api';
import { ENDPOINT } from '../../constants';
import List from '../../components/List';
import getItemsForUpdating from '../../utils/getItemsForUpdating';
import getFilteredMovies, { types } from './getFilteredMovies';

export const fields = [
  'id',
  'name',
  'releaseDateTheatrical',
  'releaseDateDigital',
  'url',
  'rating',
  'imdbUrl',
  'runtime',
  'backgroundImage'
];

class Items extends Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.props.movies);
  }

  fetchData(movies) {
    const items = getItemsForUpdating({ fields, items: movies });

    if (items.length > 0) {
      postData(`${ENDPOINT}/movies`, { items }).then(res => {
        res.data.forEach(movie => this.props.add(movie));
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.movies.length !== nextProps.movies.length) {
      this.fetchData(nextProps.movies);
    }
  }

  render() {
    const type = types[this.props.type];
    const movies = getFilteredMovies(this.props);
    const items = movies.map(movie => ({
      title: movie.name,
      rating: movie.rating,
      date: movie[type] && movie[type].date,
      dateCountryCode: movie[type] && movie[type].countryCode,
      url: movie.url,
      backgroundImage: movie.backgroundImage,
      viewAsUid: this.props.viewAsUid,
      onAdd: () => this.props.add(movie),
      onArchive: () => this.props.archive(movie.id),
      onPin: () => this.props.pin(movie.id),
      onDelete: () => this.props.remove(movie.id)
    }));
    return <List items={items} />;
  }
}

export default Items;
