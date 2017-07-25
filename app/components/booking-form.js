import Ember from 'ember';
import CostCalculator from '../utils/cost-calculator';
import { task } from 'ember-concurrency';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['booking-form'],

  store: Ember.inject.service(),

  rental: null,
  range: null,
  cost: computed('rental', 'range', function() {
    return CostCalculator(this.get('rental'), this.get('range'));
  }),

  actions: {

    show(modal) {
      if (modal === 'dropdown-menu') {
        this._showDropdownMenu();
      }
      else {
        this._showModal(modal);
      }
    },

    hide(modal) {
      if (modal === 'dropdown-menu') {
        this._hideDropdownMenu();
      }
      else {
        this._hideModal(...arguments);
      }
    }
  },

  submit(evt) {
    // Prevent form from submitting
    evt.preventDefault();

    // Ask user for email address and fetch the
    // rental relationship and the check-in/check-out dates.
    const rental  = this.get('rental');
    const range   = this.get('range');

    // Save if valid, otherwise show error
    if (this._isValid({ rental: rental, range: range, skip_email: true })) {
      const email = window.prompt("What is your email?");

      if (this._isValid({skip_rental: true, skip_range: true, email: email})) {
        const booking = this._createBooking(rental, range, email);
        this.get('submitTask').perform(booking);
      }
    }
  },

  submitTask: task(function * (booking) {
    try {
      yield booking.save();
      alert("Your trip is booked! 😎");
      this._cleanup();
    } catch (e) {
      e.errors.forEach(error => alert(error.detail + ' 😕'));
    }
  }).drop(),

  _showDropdownMenu() {
    this.set('dropdownVisible', true);
  },

  _hideDropdownMenu() {
    this.set('dropdownVisible', false);
  },

  _showModal(modal) {
    this.setProperties({
      modalWindow: modal,
      modalVisible: true
    });
  },

  _hideModal(modal, rental, range) {
    this.setProperties({
      modalWindow: null,
      modalVisible: false,
      rental: rental,
      range: range
    });
  },

  _cleanup() {
    this.setProperties({
      rental: null,
      range: null
    });
  },

  _createBooking(rental, range, email) {
    return this.get('store').createRecord('booking', {
      rental: rental,
      clientEmail: email,
      startAt: range.start,
      endAt: range.end
    });
  },

  _isValid(options={}) {
    const rental = options["rental"];
    const range  = options["range"];
    const email  = options["email"];

    if (!options["skip_rental"]) {
      if (!rental)           { return this._alert("No rental. 😫"); }
    }

    if (!options["skip_range"]) {
      if (!range)            { return this._alert("No rental dates. 😫"); }
      if (!range.start)      { return this._alert("No check in date. 😫"); }
      if (!range.end)        { return this._alert("No check out date. 😫"); }
    }

    if (!options["skip_email"]) {
      if (!email)            { return this._alert("No email. 😫"); }
      if (!email.match(/@/)) { return this._alert("Weird email address. 😫"); }
    }

    return true;
  },

  _alert(message) {
    window.alert(message);
    return false;
  }
});
