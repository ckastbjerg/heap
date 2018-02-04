import moment from 'moment';

export default function getAddObject(item) {
  if (item.latestEpisode) {
    return Object.assign({}, item, {
      dateUpdated: moment().toISOString(),
      pinned: false,
      latestEpisode: Object.assign({}, item.latestEpisode, {
        archived: false
      })
    });
  }

  return Object.assign({}, item, {
    dateUpdated: moment().toISOString(),
    archived: false,
    pinned: false
  });
}
