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

  yesterday: moment().add(-1, 'days'),

  formattedRange: Ember.computed('range', function() {
    const range = this.get('range');

    if (!range || !range.start || !range.end) {
      return 'Anytime';
    }

    const start = range.start.format("MMM DD");
    const end = range.end.format("MMM DD");

    return `${start} - ${end}`;
  })
});