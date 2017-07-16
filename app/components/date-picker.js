import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  moment: Ember.inject.service(),

  calculatePosition(trigger) {
    const element = document.querySelector("#date-picker");
    const measurements = element.getBoundingClientRect();

    return {
      style: {
        left: measurements.left,
        top: measurements.top + measurements.height + 1,
        width: measurements.width * 3
      }
    };
  },

  today: moment(),
  yesterday: moment().add(-1, 'days'),

  dateRange: Ember.computed('range', function() {
    const range = this.get('range');

    if (!range || !range.start || !range.end) { return ''; }

    const start = range.start.format("MMM DD");
    const end = range.end.format("MMM DD");

    return `${start} - ${end}`;
  })
});
