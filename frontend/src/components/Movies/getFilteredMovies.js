import moment from 'moment';

export const types = {
  digital: 'releaseDateDigital',
  theatrical: 'releaseDateTheatrical'
};

export const filters = {
  archived: 'archived',
  awaited: 'awaited',
  latest: 'latest',
  upcoming: 'upcoming',
  pinned: 'pinned'
};

export default function getFilteredMovies({ movies, type, filter }) {
  const now = moment();
  const filterType = types[type];
  const filterTime = filter;
  const data = Object.keys(movies)
    .map(key => {
      const movie = movies[key];
      const date = movie[filterType];
      return { ...movie, date };
    })
    .filter(movie => {
      const date = movie.date ? movie.date.date : null;
      if (filterTime === filters.archived) {
        return !!movie.archived;
      } else if (filterTime === filters.pinned) {
        return !!movie.pinned;
      } else if (filterTime === filters.upcoming) {
        return (
          !moment(date).isBefore(now) &&
          !movie.archived &&
          !movie.pinned &&
          !!date
        );
      } else if (filterTime === filters.latest) {
        return moment(date).isBefore(now) && !movie.archived && !movie.pinned;
      } else if (filterTime === filters.awaited) {
        return !date && !movie.archived && !movie.pinned;
      }

      return undefined;
    });

  if (filterTime === filters.awaited || filterTime === filters.archived) {
    return data;
  } else if (filterTime === filters.latest) {
    return data.sort((a, b) => {
      if (filterTime === filters.latest) {
        return moment(b[filterType].date).diff(a[filterType].date);
      }

      return moment(a[filterType].date).diff(b[filterType].date);
    });
  }

  return data.sort((a, b) => {
    if (filterTime === filters.latest) {
      return moment(a[filterType].date).diff(b[filterType].date);
    }

    if (!a[filterType]) {
      return 1;
    } else if (!b[filterType]) {
      return -1;
    }

    return moment(a[filterType].date).diff(b[filterType].date);
  });
}
