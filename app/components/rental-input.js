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
      this.set('rental', null);
      this.focus();
    },
    save() {
      this.set('fadeOut', true);
    }
  },

  didInsertElement() {
    this.focus();
  },

  animationEnd() {
    if (this.get('fadeOut')) {
      this.get('hide')(this.get('rental'));
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
