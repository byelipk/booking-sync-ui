import Ember from 'ember';

export default Ember.Mixin.create({
  el: document.querySelector('.overflow-wrapper'),

  addNoScrollClass: Ember.on('didInsertElement', function() {
    this.get('el').classList.add('no-scroll');
  }),

  removeNoScrollClass: Ember.on('willDestroyElement', function() {
    this.get('el').classList.remove('no-scroll');
  }),
});
