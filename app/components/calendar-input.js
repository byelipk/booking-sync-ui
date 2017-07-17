import Ember from 'ember';
import moment from 'moment';
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
      this.set('range', null);
    },
    save() {
      this.get('hide')(this.get('rental'), this.get('range'));
    }
  },

  today: moment(),
  yesterday: moment().add(-1, 'days'),
});
