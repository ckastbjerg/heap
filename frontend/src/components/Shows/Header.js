import React from 'react';

import { Title, Header as ModuleHeader, Select } from '../../composers/Module';

function filterToLabel(filter) {
  if (filter === 'latest') {
    return 'Unwatched episodes';
  } else if (filter === 'upcoming') {
    return 'Upcoming episodes';
  } else if (filter === 'archived') {
    return 'Watched episodes';
  } else if (filter === 'pinned') {
    return 'Pinned shows';
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
        <option value="archived">Watched</option>
        <option value="latest">Latest</option>
        <option value="upcoming">Upcoming</option>
        <option value="stashed">Pinned</option>
      </Select>
    )}
  </ModuleHeader>
);

export default Header;
