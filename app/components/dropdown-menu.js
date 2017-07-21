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

  cost: computed('rental', 'range', function() {
    return CostCalculator(this.get('rental'), this.get('range'));
  }),
});
