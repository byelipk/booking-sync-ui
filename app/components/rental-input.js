import Ember from 'ember';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';
import NotScrollable from '../mixins/not-scrollable';

export default Ember.Component.extend(TransitionMixin, NotScrollable, {
  transitionClass: 'slide-from-bottom',
  classNames: ['cover'],

  actions: {
    hide() {
      this.get('hide')(this.get('rental'), this.get('range'));
    },
    reset() {
      this.set('rental', null);
      this.focus();
    },
    save() {
      this.get('hide')(this.get('rental'), this.get('range'));
    }
  },

  focusOnInsert: Ember.on('didInsertElement', function() {
    this.focus();
  }),

  calculatePosition(trigger, content) {
    const measurements = trigger.getBoundingClientRect();

    return {
      style: {
        left: measurements.left,
        top: measurements.top + measurements.height,
        width: measurements.width
      }
    };
  },

  focus() {
    document.querySelector('.sex-on input').focus();
  }
});
