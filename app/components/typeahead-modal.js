import Ember from 'ember';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';
import NotScrollable from '../mixins/not-scrollable';

export default Ember.Component.extend(TransitionMixin, NotScrollable, {
  transitionClass: 'slide-from-bottom',
  classNames: ['cover'],

  actions: {
    hide(rental) {
      this.get('hide')(rental, this.get('range'));
    },
    reset() {
      this.set('rental', null);
      this.focus();
    },
    save() {
      this.send('hide');
    }
  },

  focusOnInsert: Ember.on('didInsertElement', function() {
    this.focus();
  }),

  calculatePosition(trigger) {
    const measurements = trigger.getBoundingClientRect();

    return {
      style: {
        left: measurements.left,
        top: measurements.top + measurements.height + 35,
        width: measurements.width
      }
    };
  },

  focus() {
    document.querySelector('.ember-power-select-search-input').focus();
  }
});
