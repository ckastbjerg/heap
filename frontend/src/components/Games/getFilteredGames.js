import moment from 'moment';

const filters = {
  archived: 'archived',
  latest: 'latest',
  upcoming: 'upcoming',
  awaited: 'awaited',
  pinned: 'pinned'
};

const getAwaitedGames = games => games.filter(game => !game.releaseDate);
const getPinnedGames = games =>
  games.filter(game => !!game.pinned && !game.archived);
const getArchivedGames = games => games.filter(game => !!game.archived);
const getLatestGames = games =>
  games.filter(
    game =>
      !!game.releaseDate &&
      !game.archived &&
      !game.pinned &&
      moment(game.releaseDate).isBefore(moment())
  );
const getUpcomingGames = games =>
  games.filter(
    game =>
      !!game.releaseDate &&
      !game.archived &&
      !game.pinned &&
      !moment(game.releaseDate).isBefore(moment())
  );

const sortGames = (games, filter) =>
  games.sort((a, b) => {
    return filter === filters.latest
      ? moment(b.releaseDate).diff(a.releaseDate)
      : moment(a.releaseDate).diff(b.releaseDate);
  });

export default function getFilteredGames({ games, filter }) {
  let gamesArray = Object.keys(games).map(key => games[key]);

  if (filter === filters.awaited) {
    return getAwaitedGames(gamesArray);
  } else if (filter === filters.pinned) {
    gamesArray = getPinnedGames(gamesArray);
  } else if (filter === filters.archived) {
    gamesArray = getArchivedGames(gamesArray);
  } else if (filter === filters.latest) {
    gamesArray = getLatestGames(gamesArray);
  } else if (filter === filters.upcoming) {
    gamesArray = getUpcomingGames(gamesArray);
  }

  return sortGames(gamesArray, filter);
}
