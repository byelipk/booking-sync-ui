import Ember from 'ember';

export function formatDateRange([start, end]) {
  if (!start || !end) { return '🤷‍'; }

  if (start.month() === end.month()) {
    return `${start.format("MMM DD")} - ${end.format("DD")}`;
  }
  else {
    return `${start.format("MMM DD")} - ${end.format("MMM DD")}`;
  }
}

export default Ember.Helper.helper(formatDateRange);
