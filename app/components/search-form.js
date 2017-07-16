import Ember from 'ember';
import moment from 'moment';
import { task, timeout } from 'ember-concurrency';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['search'],

  store: Ember.inject.service(),

  actions: {

    // This action is invoked when a modal is displayed
    showModal(component) {
      this.set('modalWindow', component);
      this.set('modalVisible', true);
    },

    // This action is invoked when a modal is hidden. It may
    // be passed a rental object.
    hideModal(rental, range) {
      this.set('modalWindow', null);
      this.set('modalVisible', false);
      this.set('rental', rental);
      this.set('range', range);
    },

    // This action is invoked when the navigation bar
    // is displayed or hidden.
    toggleDropdown(rental) {
      this.toggleProperty('dropdownVisible');
    }
  },

  submit(evt) {
    evt.preventDefault();

    const rental  = this.get('rental');
    const range   = this.get('range');

    if (this._validate(rental, range)) {
      const booking = this._createBooking(rental, range);
      this.get('submitTask').perform(booking);
    }
    else {
      alert("Something went wrong validating the booking. 😦");
    }
  },

  submitTask: task(function * (booking) {
    try {
      yield booking.save();
      alert("Your trip is booked! 😎");
    } catch (e) {
      e.errors.forEach(error => alert(error.detail + ' 😕'));
    }
  }).drop(),

  _validate(rental, range) {
    if (rental && range && range.start && range.end) {
      return true;
    }
    else {
      return false;
    }
  },

  _createBooking(rental, range) {
    return this.get('store').createRecord('booking', {
      startAt: range.start.toDate(),
      endAt: range.end.toDate(),
      price: Number.parseFloat(this.get('rentalCost')),
      clientEmail: 'me@email.com',
      rental: rental
    });
  },

  // This property tracks the type of component
  // we will render into the modal
  modalWindow: null,

  rentalName: Ember.computed('rental', function() {
    const rental = this.get('rental');

    if (rental && rental.name) {
      return rental.name;
    }
    else {
      return '';
    }
  }),

  dateRange: Ember.computed('range', function() {
    const range = this.get('range');

    if (!range || !range.start || !range.end) { return ''; }

    if (range.start.month() === range.end.month()) {
      return `${range.start.format("MMM DD")} - ${range.end.format("DD")}`;
    }
    else {
      return `${range.start.format("MMM DD")} - ${range.end.format("MMM DD")}`;
    }
  }),

  rentalCost: Ember.computed('rental', 'range', function() {
    const rental = this.get('rental');
    const range = this.get('range');

    if (!range       ||
        !range.start ||
        !range.end   ||
        !rental      ||
        !rental.get('dailyRate')) { return ''; }

    const daysInRange = range.end.diff(range.start, 'days');
    const dailyPrice  = Number.parseFloat(rental.get('dailyRate'));

    return daysInRange * dailyPrice;
  }),

  rentalNameString: Ember.computed('rentalName', function() {
    const rentalName = this.get('rentalName');

    if (!rentalName) {
      return 'Anything';
    }
    else {
      if (rentalName.length > 10) {
        return rentalName.substr(0, 10) + `...`;
      }
      else {
        return rentalName;
      }
    }
  }),

  dateRangeString: Ember.computed('dateRange', function() {
    const dateRange = this.get('dateRange');

    if (!dateRange) {
      return 'Anytime';
    }
    else {
      return dateRange;
    }
  })
});
