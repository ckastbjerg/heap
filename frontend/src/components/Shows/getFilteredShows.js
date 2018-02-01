import moment from 'moment';

export const filters = {
  archived: 'archived',
  latest: 'latestEpisode',
  upcoming: 'upcomingEpisode',
  pinned: 'pinned'
};

const getPinnedShows = shows => shows.filter(show => !!show.pinned);
const getArchivedShows = shows => shows.filter(show => !!show.archived);
const getLatestEpisodes = shows =>
  shows.filter(
    show =>
      !show.archived && !show.pinned && moment(show.airDate).isBefore(moment())
  );
const getUpcomingEpisodes = shows =>
  shows.filter(
    show =>
      !show.archived && !show.pinned && !moment(show.airDate).isBefore(moment())
  );

const getShowsWithAirDates = (filterTime, shows) =>
  shows
    .map(show => {
      const episode =
        filterTime === filters.archived
          ? show[filters.latest]
          : show[filterTime];

      return episode ? { ...show, ...episode } : null;
    })
    .filter(show => !!show);

const sortShows = (data, filterTime) =>
  data.sort((a, b) => {
    if (filterTime === filters.upcoming) {
      return moment(a.airDate).diff(b.airDate);
    }

    return moment(b.airDate).diff(a.airDate);
  });

export default function getFilteredShows({ shows, filter }) {
  const showsArray = Object.keys(shows).map(key => shows[key]);
  const filterTime = filters[filter];
  const showsWithAirDates = getShowsWithAirDates(filterTime, showsArray);
  let result;

  if (filterTime === filters.pinned) {
    result = getPinnedShows(showsWithAirDates);
  } else if (filterTime === filters.archived) {
    result = getArchivedShows(showsWithAirDates);
  } else if (filterTime === filters.latest) {
    result = getLatestEpisodes(showsWithAirDates);
  } else if (filterTime === filters.upcoming) {
    result = getUpcomingEpisodes(showsWithAirDates);
  }

  return sortShows(result, filterTime);
}
