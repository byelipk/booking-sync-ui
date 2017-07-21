import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['search-form'],

  store: Ember.inject.service(),

  rental: null,
  range: null,

  actions: {

    show(modal) {
      if (modal === 'dropdown-menu') {
        this._showDropdownMenu();
      }
      else {
        this._showModal(modal);
      }
    },

    hide(modal, rental, range) {
      if (modal === 'dropdown-menu') {
        this._hideDropdownMenu();
      }
      else {
        this._hideModal(rental, range);
      }
    }
  },

  submit(evt) {
    evt.preventDefault();

    // const rental  = this.get('rental');
    // const range   = this.get('range');
    // const email   = window.prompt("What is your email?");
    //
    // if (this._validate(rental, range, email)) {
    //   const booking = this._createBooking(rental, range, email);
    //   this.get('submitTask').perform(booking);
    // }
    // else {
    //   alert("Something went wrong validating the booking. 😦");
    // }
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
  //
  // _validate(rental, range, email) {
  //   if (rental && range && range.start && range.end) {
  //     if (!email.match(/@/)) {
  //       return false;
  //     }
  //     else {
  //       return true;
  //     }
  //   }
  //   else {
  //     return false;
  //   }
  // },
  //
  // _createBooking(rental, range, email) {
  //   return this.get('store').createRecord('booking', {
  //     startAt: range.start.toDate(),
  //     endAt: range.end.toDate(),
  //     price: Number.parseFloat(this.get('rentalCost')),
  //     clientEmail: email,
  //     rental: rental
  //   });
  // },
  //
  // // This property tracks the type of component
  // // we will render into the modal
  // modalWindow: null,
  //
  // rentalName: Ember.computed('rental', function() {
  //   const rental = this.get('rental');
  //
  //   if (rental && rental.get('name')) {
  //     return rental.get('name');
  //   }
  //   else {
  //     return '';
  //   }
  // }),
  //
  // dateRange: Ember.computed('range', function() {
  //   const range = this.get('range');
  //
  //   if (!range || !range.start || !range.end) { return ''; }
  //
  //   if (range.start.month() === range.end.month()) {
  //     return `${range.start.format("MMM DD")} - ${range.end.format("DD")}`;
  //   }
  //   else {
  //     return `${range.start.format("MMM DD")} - ${range.end.format("MMM DD")}`;
  //   }
  // }),
  //
  // rentalCost: Ember.computed('rental', 'range', function() {
  //   const rental = this.get('rental');
  //   const range = this.get('range');
  //
  //   if (!range       ||
  //       !range.start ||
  //       !range.end   ||
  //       !rental      ||
  //       !rental.get('dailyRate')) { return ''; }
  //
  //   const daysInRange = range.end.diff(range.start, 'days');
  //   const dailyPrice  = Number.parseFloat(rental.get('dailyRate'));
  //
  //   return daysInRange * dailyPrice;
  // }),
  //
  // rentalNameString: Ember.computed('rentalName', function() {
  //   const rentalName = this.get('rentalName');
  //
  //   if (!rentalName) {
  //     return 'Anything';
  //   }
  //   else {
  //     if (rentalName.length > 10) {
  //       return rentalName.substr(0, 10) + `...`;
  //     }
  //     else {
  //       return rentalName;
  //     }
  //   }
  // }),
  //
  // dateRangeString: Ember.computed('dateRange', function() {
  //   const dateRange = this.get('dateRange');
  //
  //   if (!dateRange) {
  //     return 'Anytime';
  //   }
  //   else {
  //     return dateRange;
  //   }
  // })

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

  _hideModal(rental, range) {
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
  }
});
