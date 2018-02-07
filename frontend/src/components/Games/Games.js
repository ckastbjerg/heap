import React, { Component } from 'react';
import { postData } from '../../api';

import { ENDPOINT } from '../../constants';
import List from '../../components/List';
import getItemsForUpdating from '../../utils/getItemsForUpdating';
import getFilteredGames from './getFilteredGames';

const requiredFields = [
  'id',
  'name',
  'releaseDate',
  'url',
  'rating',
  'backgroundImage'
];

class Items extends Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.props.games);
  }

  fetchData(games) {
    const items = getItemsForUpdating({
      fields: requiredFields,
      items: games
    });
    if (items.length > 0) {
      postData(`${ENDPOINT}/games`, { items }).then(res => {
        res.data.forEach(game => this.props.add(game));
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.games.length !== nextProps.games.length) {
      this.fetchData(nextProps.games);
    }
  }

  render() {
    const games = getFilteredGames(this.props);
    const items = games.map(game => ({
      title: game.name,
      rating: game.rating,
      date: game.releaseDate,
      url: game.url,
      backgroundImage: game.backgroundImage,
      viewAsUid: this.props.viewAsUid,
      onAdd: () => this.props.add(game),
      onArchive: () => this.props.archive(game.id),
      onDelete: () => this.props.remove(game.id),
      onPin: () => this.props.pin(game.id)
    }));
    return <List items={items} />;
  }
}

export default Items;
