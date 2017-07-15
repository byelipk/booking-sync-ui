import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['cover', 'cover-blankslate'],
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
});
