const HOUR = 60;

const getNumber = (item) => {
  item = item.split(':');
  item[1] = item[1].padEnd(2, '0');
  item = Number(item.join(''));
  return item;
};

const isMeetMatches = (workStart, workEnd, meetStart, meetDuration) => {
  const meetStarts = meetStart.split(':');

  const meetDurationInHours = (meetDuration / HOUR).toFixed(2);
  const meetDurationMinutes = Number(meetDurationInHours.split('.').splice(1, 1));
  const meetDurationHours = Number(meetDurationInHours.split('.').splice(0, 1));

  const meetEndNumber = (Number(meetStarts[0]) + meetDurationHours).toString() + (Number(meetStarts[1]) + meetDurationMinutes).toString().padStart(2, '0');

  meetStarts[1] = meetStarts[1].padEnd(2, '0');
  const meetStartsNumber = Number(meetStarts.join(''));

  const workStartNumber = getNumber(workStart);
  const workEndNumber = getNumber(workEnd);

  if (
    meetStartsNumber >= workStartNumber &&
    meetEndNumber <= workEndNumber
  ) {
    return true;
  } else {
    return false;
  }
};

isMeetMatches('08:00', '17:30', '14:00', 90);
