import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['cover'],
  classNameBindings: ['sliderUp', 'sliderDown'],

  sliderUp: true,
  sliderDown: false,

  actions: {
    hide() {
      this.set('sliderDown', true);
    }
  },

  animationEnd() {
    if (this.get('sliderDown')) {
      this.get('hide')();
    }
  },
});
