import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),

  actions: {
    updateSelected(rental, trigger) {
      this.set('selected', rental);

      if (this.get('onselected')) {
        this.get('onselected')(rental);
      }
      else {
        trigger.actions.close();
      }
    }
  },

  searchTask: task(function * (term) {
    yield timeout(250);

    return yield this.get('store').query('rental', {
      query: encodeURIComponent(term)
    });
  }).restartable(),

  calculatePosition() {
    const target = document.querySelector('.booking-form');
    const measurements = target.getBoundingClientRect();

    return {
      style: {
        left: measurements.left,
        top: measurements.top + measurements.height + 3,
        width: measurements.width
      }
    };
  },
});
