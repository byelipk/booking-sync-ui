import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'footer',
  classNames: ['cover-footer'],

  actions: {
    save() {
      this.get('save')();
    }
  }
});
