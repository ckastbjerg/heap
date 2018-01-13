import React from 'react';

import ListItem from './ListItem';
import { Root } from './ListElements';

const List = ({ items }) => (
  <Root>{items.map(item => <ListItem key={item.id} {...item} />)}</Root>
);

export default List;
