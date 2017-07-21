import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'header',
  classNames: ['cover-header'],

  actions: {
    hide() {
      this.get('hide')();
    },
    reset() {
      this.get('reset')();
    }
  }
});
