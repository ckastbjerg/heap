import React from 'react';

import { Title, Header as ModuleHeader, Select } from '../../composers/Module';

function filterToLabel(filter) {
  if (filter === 'latest') {
    return `Unplayed games`;
  } else if (filter === 'upcoming') {
    return `Upcoming games`;
  } else if (filter === 'archived') {
    return `Played games`;
  } else if (filter === 'pinned') {
    return `Pinned games`;
  }

  return filter;
}

const Header = ({ setFilter, setType, type, filter, showFilters }) => (
  <ModuleHeader>
    <Title>{filterToLabel(filter)}</Title>
    {showFilters && (
      <Select
        value={filter}
        type="filter"
        onChange={e => setFilter(e.target.value)}
      >
        <option value="archived">Played</option>
        <option value="latest">Latest</option>
        <option value="upcoming">Upcoming</option>
        <option value="stashed">Pinned</option>
      </Select>
    )}
  </ModuleHeader>
);

export default Header;
