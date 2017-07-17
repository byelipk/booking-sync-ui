import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  tagName: 'form',
  store: Ember.inject.service(),

  classNames: ['rental-form'],

  focusOnInsert: Ember.on('didInsertElement', function() {
    this.focus();
  }),

  submit(evt) {
    evt.preventDefault();

    const name = this.get('rentalName');
    const dailyRate = this.get('dailyRate');

    if (this._validate(name, dailyRate)) {
      const rental = this._createRental(name, dailyRate);
      this.get('submitTask').perform(rental);
    }
    else {
      alert("Something went wrong validating the rental. 😦");
    }
  },

  _validate(name, dailyRate) {
    if (!name || name.length > 40) {
      return false;
    }

    if (!dailyRate || dailyRate <= 0 && parseInt(dailyRate, 10) !== NaN) {
      return false;
    }

    return true;
  },

  _createRental(name, dailyRate) {
    return this.get('store').createRecord('rental', {
      name: name,
      dailyRate: dailyRate
    });
  },

  submitTask: task(function * (rental) {
    try {
      yield rental.save();
      alert("Rental saved! 😎");
      this.set('rentalName', null);
      this.set('dailyRate', null);
      this.focus();
    } catch (e) {
      e.errors.forEach(error => alert(error.detail));
    }
  }).drop(),

  focus() {
    document.querySelector('input[type="text"]').focus();
  }
});
