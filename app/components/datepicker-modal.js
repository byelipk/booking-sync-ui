import Ember from 'ember';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';

export default Ember.Component.extend(TransitionMixin, {
  transitionClass: 'slide-from-bottom',
  classNames: ['cover'],

  actions: {
    hide(rental, range) {
      if (!rental) { rental = this.get('rental'); }
      if (!range)  { range = this.get('range'); }

      this.get('hide')(rental, range);
    },
    reset() {
      this.set('range', null);
    },
    save() {
      this.send('hide');
    }
  }
});
