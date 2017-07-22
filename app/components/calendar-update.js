import Ember from 'ember';
import moment from 'moment';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';
import NotScrollable from '../mixins/not-scrollable';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend(TransitionMixin, NotScrollable, {
  transitionClass: 'slide-from-bottom',
  classNames: ['cover'],

  actions: {
    hide() {
      const booking = this.get('booking');

      booking.rollbackAttributes();
      this.get('hide')(booking);
    },

    reset() {
      this.get('booking').rollbackAttributes();
    },

    updateRange(_rental, range) {
      const booking = this.get('booking');

      booking.setProperties({
        startAt: range.start,
        endAt: range.end
      });
    },

    save() {
      const booking = this.get('booking');
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
    }
  }).drop(),

  today: moment(),
  yesterday: moment().add(-1, 'days'),
});
