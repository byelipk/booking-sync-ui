import Ember from 'ember';
import BookingForm from '../models/booking-form';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['booking-form'],

  store: Ember.inject.service(),

  init() {
    this._super(...arguments);

    this.set('model', BookingForm.create());
  },

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
    },

    updateRental(rental) {
      this.get('model').set('rental', rental);
    },

    updateRange(_rental, range) {
      this.get('model').setProperties(range);
    }
  },

  submit(evt) {
    // Prevent form from submitting
    evt.preventDefault();

    const model = this.get('model');

    let validations = model.validate({rental: true, range: true});
    if (!validations.valid) { return this._alert(validations.message); }

    model.set('email', window.prompt("What is your email?"));

    validations = model.validate({email: true});
    if (!validations.valid) { return this._alert(validations.message); }

    const booking = this._createBooking(
      model.getProperties('rental', 'start', 'end', 'email'));

    this.get('submitTask').perform(booking);
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
    this.setProperties({ modalWindow: modal, modalVisible: true });
  },

  _hideModal() {
    this.setProperties({ modalWindow: null, modalVisible: false });
  },

  _cleanup() {
    this.set('model', BookingForm.create());
  },

  _createBooking({rental, start, end, email}) {
    return this.get('store').createRecord('booking', {
      rental: rental,
      clientEmail: email,
      startAt: start,
      endAt: end
    });
  },

  _alert(message) {
    window.alert(message);
    return false;
  }
});
