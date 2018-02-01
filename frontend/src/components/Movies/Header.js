import React from 'react';

import { Title, Header as ModuleHeader, Select } from '../../composers/Module';

function filterToLabel(filter, type) {
  if (filter === 'latest') {
    return `Unwatched ${type} movies`;
  } else if (filter === 'upcoming') {
    return `Upcoming ${type} movies`;
  } else if (filter === 'archived') {
    return `Watched ${type} movies`;
  } else if (filter === 'pinned') {
    return `Pinned ${type} movies`;
  }

  return filter;
}

const Header = ({ filter, setFilter, setType, showFilters, type }) => (
  <ModuleHeader>
    <Title>{filterToLabel(filter, type)}</Title>
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
