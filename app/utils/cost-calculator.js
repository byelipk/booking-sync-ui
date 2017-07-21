export default function costCalculator(rental, range) {
  if (!range       ||
      !range.start ||
      !range.end   ||
      !rental      ||
      !rental.get('dailyRate')) { return; }

  const daysInRange = range.end.diff(range.start, 'days');
  const dailyPrice  = Number.parseFloat(rental.get('dailyRate'));

  return daysInRange * dailyPrice;
}
