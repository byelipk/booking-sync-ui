import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  classNames: ['datepicker'],

  actions: {
    hide(rental, range) {
      this.get('hide')(rental, range);
    },

    onselected(dropdown, rental, range) {
      this.get('onselected')(rental, range);
      dropdown.actions.close();
    }
  },

  // NOTE: This function is only called on large screen sizes
  //       when we have to absolutely position the date picker.
  calculatePosition() {
    const parent = document.querySelector(".large-screen");
    const element = parent.children[1];
    const measurements = element.getBoundingClientRect();

    return {
      style: {
        left: measurements.left,
        top: measurements.top + measurements.height + 1,
        width: measurements.width
      }
    };
  },

  today: moment(),
  yesterday: moment().add(-1, 'days')
});
