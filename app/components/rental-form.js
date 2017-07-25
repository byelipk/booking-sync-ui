import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  tagName: 'form',
  store: Ember.inject.service(),

  classNames: ['rental-form'],

  focusOnInsert: Ember.on('didInsertElement', function() {
    this._focus();
  }),

  submit(evt) {
    evt.preventDefault();

    const name = this.get('rentalName');
    const rate = this.get('dailyRate');

    if (this._isValid({name: name, rate: rate})) {
      const rental = this._createRental(name, rate);
      this.get('submitTask').perform(rental);
    }
  },

  submitTask: task(function * (rental) {
    try {
      yield rental.save();

      alert("Rental saved! 😎");

      this.set('rentalName', null);
      this.set('dailyRate', null);

      this._focus();
    } catch (e) {
      e.errors.forEach(error => alert(error.detail));
    }
  }).drop(),

  _focus() {
    document.querySelector('input[type="text"]').focus();
  },

  _createRental(name, dailyRate) {
    return this.get('store').createRecord('rental', {
      name: name,
      dailyRate: dailyRate
    });
  },

  _isValid(options={}) {
    const name = options["name"];
    const rate = parseInt(options["rate"], 10);

    if (!options["skip_name"]) {
      if (!name)            { return this._alert("No name. 😕"); }
      if (name.length > 40) { return this._alert("Name is too long. 😕"); }
    }

    if (!options["skip_rate"]) {
      if (!rate)                 { return this._alert("No rate. 😕"); }
      if (isNaN(rate))           { return this._alert("No rate. 😕"); }
      if (rate < 0)              { return this._alert("That's not fair to you. 😕"); }
      if (rate.length > 1000000) { return this._alert("No one will pay that. 😯"); }
    }

    return true;
  },

  _alert(message) {
    window.alert(message);
    return false;
  }
});
