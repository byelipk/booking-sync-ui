import Ember from 'ember';
import moment from 'moment';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';
import NotScrollable from '../mixins/not-scrollable';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend(TransitionMixin, NotScrollable, {
  transitionClass: 'slide-from-bottom',
  classNames: ['cover'],

  range: {},

  init() {
    this._super(...arguments);

    const booking = this.get('booking');
    const range   = this.get('range');

    range.start = booking.get('startAt');
    range.end   = booking.get('endAt');

    this.set('range', range);
  },

  actions: {
    hide() {
      this.get('hide')(this.get('range'));
    },
    update() {
      const booking = this.get('booking');
      const range   = this.get('range');

      booking.setProperties({
        startAt: range.start,
        endAt: range.end
      });

      this.get('updateTask').perform(booking);
    }
  },

  updateTask: task(function * (booking) {
    yield timeout(50);

    try {
      yield booking.save();
      alert("Booking updated! 🙃");
      this.get('hide')(booking);
    } catch (e) {
      if (e.errors) {
        e.errors.forEach(error => alert(error.detail));
      }
      else {
        console.error(e);
      }
    }
  }).drop(),

  today: moment(),
  yesterday: moment().add(-1, 'days'),
});
