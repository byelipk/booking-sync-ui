import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),

  actions: {
    updateSelected(rental, trigger) {
      if (this.get('onselected')) {
        this.get('onselected')(rental);
      }
      else {
        this.set('selected', rental);
      }

      trigger.actions.close();
    }
  },

  searchTask: task(function * (term) {
    yield timeout(250);

    return yield this.get('store').query('rental', {
      query: encodeURIComponent(term)
    });
  }).restartable(),

  // See: https://www.ember-basic-dropdown.com/docs/custom-position
  calculatePosition(trigger) {
    let target = document.querySelector('.booking-form');
    if (!target) { target = trigger; }

    const measurements = target.getBoundingClientRect();

    return {
      style: {
        left: measurements.left,
        top: measurements.top + measurements.height + 3,
        width: measurements.width
      }
    };
  }
});
