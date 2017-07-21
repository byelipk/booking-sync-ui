import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  // This is the rental selected by the user
  rental: null,

  // An object representing the checkin / checkout dates
  range: null,

  currencySymbol: '$',

  cost: computed('rental', 'range', function() {
    const rental = this.get('rental');
    const range = this.get('range');

    if (!range       ||
        !range.start ||
        !range.end   ||
        !rental      ||
        !rental.get('dailyRate')) { return; }

    const daysInRange = range.end.diff(range.start, 'days');
    const dailyPrice  = Number.parseFloat(rental.get('dailyRate'));

    return daysInRange * dailyPrice;
  }),
});
