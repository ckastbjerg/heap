import moment from 'moment';

const today = moment().startOf('day');

export default ({ fields, items }) => {
  return Object.keys(items)
    .map(key => items[key])
    .filter(item => {
      const isArchived = item.archived;
      const isPinned = item.pinned;
      const isOutdated =
        !item.dateUpdated ||
        moment(item.dateUpdated)
          .startOf('day')
          .isBefore(today);
      const isMissingFields =
        Object.keys(item)
          .sort()
          .join(',') !== fields.sort().join(',');
      const shouldUpdate =
        isOutdated && !isArchived && !isPinned && isMissingFields;
      return shouldUpdate;
    });
};
