import Ember from 'ember';

export function currency(params/*, hash*/) {
  let amount = params[0];
  let sign   = params[1];

  if (amount) {
    return `${sign}${amount}`;
  }
  else {
    return `${sign} Any price`;
  }
}

export default Ember.Helper.helper(currency);
