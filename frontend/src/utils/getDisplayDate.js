import moment from 'moment';

function isThisWeek(date) {
  return moment()
    .startOf('week')
    .isSame(moment(date).startOf('week'));
}

function isThisYear(date) {
  return moment()
    .startOf('year')
    .isSame(moment(date).startOf('year'));
}

export default function(date, showTime) {
  const today = moment().startOf('day');
  const time = moment(date).format('HH:mm');
  const timeString =
    time === '00:00' ? '' : ` at ${moment(date).format('HH:mm')}`;
  if (!date) {
    return 'N/A';
  } else if (
    moment(date)
      .startOf('day')
      .isSame(today)
  ) {
    return 'Today';
  } else if (isThisWeek(date)) {
    return `${moment(date).format('ddd')}${showTime ? timeString : ''}`;
  } else if (!isThisYear(date)) {
    return `${moment(date).format('MMM Do YYYY')}${showTime ? timeString : ''}`;
  }

  return `${moment(date).format('MMM Do')}${showTime ? timeString : ''}`;
}
