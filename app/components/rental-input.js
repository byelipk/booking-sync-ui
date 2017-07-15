import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['cover'],
  classNameBindings: ['fadeIn', 'fadeOut'],

  fadeIn: true,
  fadeOut: false,

  actions: {
    hide() {
      this.set('fadeOut', true);
    },
    reset() {
      this.set('selected', null);
      this.focus();
    }
  },

  didInsertElement() {
    this.focus();
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
        top: measurements.top + measurements.height,
        width: measurements.width
      }
    };
  },

  focus() {
    document.querySelector('.sex-on input').focus();
  }
});
