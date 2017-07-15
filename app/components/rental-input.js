import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['cover'],
  classNameBindings: ['fadeIn', 'fadeOut'],

  fadeIn: true,
  fadeOut: false,

  actions: {
    hide() {
      this.set('fadeOut', true);
    }
  },

  animationEnd() {
    if (this.get('fadeOut')) {
      this.get('hide')();
    }
  },

  calculatePosition(trigger, content) {
    const measurements = trigger.getBoundingClientRect();

    return {
      style: {
        left: measurements.left,
        top: measurements.top + measurements.height + 3,
        width: measurements.width 
      }
    };
  }
});
