import Ember from 'ember';
import CostCalculator from '../utils/cost-calculator';

const { computed } = Ember;

export default Ember.Component.extend({
  // This is the rental selected by the user
  rental: null,

  // An object representing the checkin / checkout dates
  range: null,

  currencySymbol: '$',

  cost: computed('rental', 'range', function() {
    return CostCalculator(this.get('rental'), this.get('range'));
  }),
});
