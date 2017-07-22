export default function costCalculator(rental, range) {
  if (!range       ||
      !range.start ||
      !range.end   ||
      !rental      ||
      !rental.get('dailyRate')) { return; }

  const days = range.end.diff(range.start, 'days');
  const rate = parseFloat(rental.get('dailyRate'));

  return days * rate;
}
