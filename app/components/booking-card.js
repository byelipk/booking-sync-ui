import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['col-12', 'col-md-6', 'col-lg-3'],

  actions: {
    delete() {
      this.get('onDelete')(this.get('booking'));
    },
    update() {
      this.get('onUpdate')(this.get('booking'));
    }
  }
});
