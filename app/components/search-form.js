import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['search'],

  actions: {
    showPopup(type) {
      this.set('smallScreenPopup', type);
      this.toggleProperty('show');
    }
  },

  smallScreenPopup: null
});
