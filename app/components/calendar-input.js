import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['cover'],
  classNameBindings: ['sliderUp', 'sliderDown'],

  sliderUp: true,
  sliderDown: false,

  actions: {
    hide() {
      this.set('sliderDown', true);
    },
    reset() {
      this.set('range', null);
    },
    save() {
      this.set('sliderDown', true);
    }
  },

  animationEnd() {
    if (this.get('sliderDown')) {
      this.get('hide')(this.get('rental'), this.get('range'));
    }
  },

  yesterday: moment().add(-1, 'days'),

});
