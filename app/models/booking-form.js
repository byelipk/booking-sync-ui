import Ember from 'ember';
import moment from 'moment';

export default Ember.Object.extend({
  init() {
    this._super(...arguments);

    this.setProperties({
      rental: null,
      start:  null,
      end:    null,
      email:  null,
    });
  },

  range: Ember.computed('start', 'end', function() {
    return this.getProperties('start', 'end');
  }),

  cost: Ember.computed('rental', 'start', 'end', function() {
    const { rental, start, end } = this.getProperties('rental', 'start', 'end');

    if (!start   ||
        !end     ||
        !rental  ||
        !rental.get('dailyRate')) { return; }

    // Assume expect the start and end date to be `moment` objects
    if (moment.isMoment(start) && moment.isMoment(end)) {
      const days = end.diff(start, 'days');
      const rate = parseFloat(rental.get('dailyRate'));

      return days * rate;
    }
    else {
      throw new Error("BookingForm#start and BookingForm#end must be `moment` objects.");
    }
  }),

  validate(options={}) {
    const { rental, start, end, email } =
      this.getProperties("rental", "start", "end", "email");

    if (!options["skip_rental"]) {
      if (!rental)           { return this._alert("No rental. 😫"); }
    }

    if (!options["skip_range"]) {
      if (!start)      { return this._alert("No check-in date. 😫"); }
      if (!end)        { return this._alert("No check-out date. 😫"); }
    }

    if (!options["skip_email"]) {
      if (!email)            { return this._alert("No email. 😫"); }
      if (!email.match(/@/)) { return this._alert("Weird email address. 😫"); }
    }

    return { valid: true, message: null };
  },

  _alert(message) {
    return {
      valid: false,
      message: message
    }
  }
});
