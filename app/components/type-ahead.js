import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),

  searchTask: task(function * (term) {
    yield timeout(250);

    return yield this.get('store').query('rental', {
      query: encodeURIComponent(term)
    });
  }).restartable(),

  calculatePosition() {
    const target = document.querySelector('.search');
    const measurements = target.getBoundingClientRect();

    return {
      style: {
        left: measurements.left + 15,
        top: measurements.top + measurements.height + 3,
        width: measurements.width - 30 // Remove padding
      }
    };
  },
});
