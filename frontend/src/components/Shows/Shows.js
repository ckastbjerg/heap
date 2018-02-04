import React, { Component } from 'react';

import { ENDPOINT } from '../../constants';
import { postData } from '../../api';
import List from '../../components/List';
import getItemsForUpdating from '../../utils/getItemsForUpdating';
import getFilteredShows from './getFilteredShows';

const fields = [
  'backgroundImage',
  'dateUpdated',
  'id',
  'isReturning',
  'latestEpisode',
  'name',
  'rating',
  'upcomingEpisode',
  'url'
];

class Items extends Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.props.shows);
  }

  fetchData(shows) {
    const items = getItemsForUpdating({ fields, items: shows });

    if (items.length > 0) {
      postData(`${ENDPOINT}/shows`, { items }).then(data => {
        data.forEach(newData => {
          const existingData = items.find(show => show.id === newData.id);
          const didWatchLatestEpisode =
            !!existingData.latestEpisode &&
            !!existingData.latestEpisode.archived &&
            existingData.latestEpisode.airDate ===
              newData.latestEpisode.airDate;

          const show = Object.assign({}, newData, {
            latestEpisode: Object.assign({}, newData.latestEpisode, {
              archived: didWatchLatestEpisode
            })
          });

          this.props.add(show);
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.shows.length !== nextProps.shows.length) {
      this.fetchData(nextProps.shows);
    }
  }

  render() {
    const shows = getFilteredShows(this.props);
    const items = shows.map(show => {
      const episodeInfo = show.episodeNumber
        ? `(${show.episodeNumber}:${show.seasonNumber})`
        : '';
      return {
        viewAsUid: this.props.viewAsUid,
        title: `${show.name} ${episodeInfo}`,
        date: show.airDate,
        backgroundImage: show.backgroundImage,
        rating: show.rating,
        url: show.url,
        id: show.id,
        onAdd: () => this.props.add(show),
        onArchive: () => this.props.archive(show.id),
        onDelete: () => this.props.remove(show.id),
        onPin: () => this.props.pin(show.id)
      };
    });
    return <List items={items} />;
  }
}

export default Items;
