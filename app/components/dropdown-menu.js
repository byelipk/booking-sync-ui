import Ember from 'ember';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';
import CostCalculator from '../utils/cost-calculator';

const { computed } = Ember;


export default Ember.Component.extend(TransitionMixin, {
  transitionClass: 'slide-from-top',

  classNames: ['drop-down'],

  actions: {
    hide() {
      this.get('hide')();
    },
    clear() {
      this.get('hide')();
    },
    what() {
      this.get('what')();
    },
    when() {
      this.get('when')();
    },
    howMuch() {
      this.get('howMuch')();
    }
  },

  rentalName: Ember.computed('rental', function() {
    const rental = this.get('rental');

    if (rental && rental.get('name')) {
      return rental.get('name');
    }
    else {
      return "Anything";
    }
  }),

  dateRange: Ember.computed('range', function() {
    const range = this.get('range');

    if (!range || !range.start || !range.end) {
      return 'Anytime';
    }

    if (range.start.month() === range.end.month()) {
      return `${range.start.format("MMM DD")} - ${range.end.format("DD")}`;
    }
    else {
      return `${range.start.format("MMM DD")} - ${range.end.format("MMM DD")}`;
    }
  }),

  cost: computed('rental', 'range', function() {
    return CostCalculator(this.get('rental'), this.get('range'));
  }),
});
