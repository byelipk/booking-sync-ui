import Ember from 'ember';

export default Ember.Component.extend({
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
  }
});
