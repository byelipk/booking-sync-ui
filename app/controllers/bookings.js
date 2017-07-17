import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Controller.extend({
  actions: {
    delete(booking) {
      this.get('deleteTask').perform(booking);
    },
    update(booking) {
      this.set('booking', booking);
      this.toggleProperty('modalVisible');
    },
    hideModal() {
      this.toggleProperty('modalVisible');
    }
  },

  deleteTask: task(function * (booking) {
    yield timeout(50);

    try {
      const result = yield booking.destroyRecord();
      alert("Nice! You've freed up some dates. 🤡");
    } catch (e) {
      if (e.errors) {
        e.errors.forEach(error => alert(error.detail));
      }
      else {
        console.error(e);
      }
    }
  }).drop()
});
