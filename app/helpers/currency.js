import Ember from 'ember';

export function currency([amount, sign]) {
  if (amount) {
    return `${sign}${parseInt(amount, 10)}`;
  }
  else {
    return `${sign} Any price`;
  }
}

export default Ember.Helper.helper(currency);
