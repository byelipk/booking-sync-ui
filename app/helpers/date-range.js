import Ember from 'ember';

export function dateRange(params) {
  const start = params[0];
  const end   = params[1];

  if (!start || !end) { return '🤷‍'; }

  if (start.month() === end.month()) {
    return `${start.format("MMM DD")} - ${end.format("DD")}`;
  }
  else {
    return `${start.format("MMM DD")} - ${end.format("MMM DD")}`;
  }
}

export default Ember.Helper.helper(dateRange);
