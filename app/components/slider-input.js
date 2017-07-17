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
      // Reset internal state
    },
    save() {
      this.get('hide')(this.get('rental'), this.get('range'));
    }
  }
});
