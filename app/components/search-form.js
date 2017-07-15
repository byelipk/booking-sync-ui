import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['search'],

  actions: {
    popUp(component) {
      this.set('smallScreenPopup', component);
      this.toggleProperty('popUp');
    },

    slideDown() {
      this.toggleProperty('slideDown');
    }
  },

  smallScreenPopup: null
});
